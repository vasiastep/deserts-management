import { Form, Button, Select, InputNumber, Input, Modal } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { fetchAPI } from '../../../services/fetch.service';
import { DessertFormValues } from '../desserts.model';

const hasDuplicates = (array: string[]) => {
  const valuesSoFar = Object.create(null);
  for (const i of array) {
    if (i in valuesSoFar) {
      return i;
    }
    valuesSoFar[i] = true;
  }
  return false;
};

type FormProductData = {
  productId: string;
  name: string;
  price: number;
  caloricContent: number;
};

type FormDataProducts = {
  productId: string;
  quantity: number;
};

type DessertsFormProps = {
  allProducts: FormProductData[];
  defaultValues: DessertFormValues;
  type: 'update' | 'create';
};

const DessertsForm = ({
  defaultValues,
  allProducts,
  type,
}: DessertsFormProps) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [productPrices, setProductPrices] = useState<any[]>([]);

  const submitWithDuplicateProductsCheck = (data: DessertFormValues) => {
    const productIds = data.products.map((p) => p.productId);
    const duplicate = hasDuplicates(productIds);

    if (!duplicate) {
      return submitFunction(data);
    }

    return Modal.confirm({
      title: `Виявлено дублікат продукту - ${
        allProducts.find((p) => p.productId === duplicate)?.name ?? ''
      }`,
      onOk() {
        submitFunction(data);
      },
    });
  };

  const submitFunction = async (data: DessertFormValues) => {
    const values = {
      name: data.name,
      profitPercent: data.profitPercent,
      utilitiesPercent: data.utilitiesPercent,
      products: data.products.map((p) => ({
        product: p.productId,
        quantity: p.quantity,
      })),
      quantityFromPortion: data.quantityFromPortion,
    };

    if (type === 'create') {
      const result = await fetchAPI('/desserts/create', 'POST', values);

      if (!result.success && result.message === 'Already exists') {
        return toast.error("Десерт з таким ім'ям вже існує");
      }

      if (!result.success) {
        return toast.error('Щось пішло не так');
      }

      toast.success(`${values.name} було додано до списку десертів`);
      Router.push('/desserts');
    }

    if (type === 'update') {
      const result = await fetchAPI(
        `/desserts/update?id=${router.query.id}`,
        'PUT',
        values,
      );

      if (!result.success) {
        return toast.error('Щось пішло не так');
      }

      toast.success(`${values.name} було успішно оновлено`);
      Router.push('/desserts');
    }
  };

  const calculateProductPrice = () => {
    const formProductsValue = form.getFieldValue('products') as (
      | FormDataProducts
      | undefined
    )[];

    const productsWithPrices = formProductsValue.map((p) =>
      p
        ? {
            ...p,
            price: +(
              (allProducts.find((pr) => pr.productId === p.productId)?.price ||
                0) * p.quantity || 0
            ).toFixed(2),
            calculatedCalories: ((allProducts.find((pr) => pr.productId === p.productId)?.caloricContent || 0) * p.quantity * 10).toFixed(1) // quantity * 1000 / 100
          }
        : null,
    );

    setProductPrices(productsWithPrices);
  };

  const handleDeleteDessert = async () => {
    const result = await fetchAPI(
      `/desserts/update?id=${router.query.id}`,
      'DELETE',
    );

    if (!result.success) {
      return toast.error('Не вдалось видалити десерт');
    }

    toast.success("Десерт було успішно видалено");
    Router.push('/desserts');
  };

  useEffect(() => {
    if (productPrices.length === 0) {
      calculateProductPrice();
    }
  }, []);

  return (
    <Form
      form={form}
      onFinish={submitWithDuplicateProductsCheck}
      autoComplete="off"
      onFieldsChange={() => calculateProductPrice()}
    >
      <Form.Item
        name="name"
        label="Назва десерту"
        labelCol={{ style: { marginBottom: -10 } }}
        initialValue={defaultValues.name}
      >
        <Input placeholder="Мокко" />
      </Form.Item>

      <Form.List name="products" initialValue={defaultValues.products}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ProductFieldsContainer key={field.key}>
                <Form.Item noStyle shouldUpdate={() => true}>
                  {() => (
                    <Form.Item
                      {...field}
                      labelCol={{ style: { marginBottom: -10 } }}
                      label="Продукт"
                      name={[field.name, 'productId']}
                      fieldKey={[field.key, 'productId']}
                      rules={[{ required: true, message: 'Потрібен продукт' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Select
                        style={{ width: 260 }}
                        showSearch
                        filterOption={(
                          input: string,
                          option?: { [prop: string]: any },
                        ) =>
                          option?.title
                            .toUpperCase()
                            .indexOf(input.toUpperCase()) !== -1
                        }
                      >
                        {allProducts.map((item) => (
                          <Select.Option
                            key={item.productId}
                            value={item.productId}
                            title={item.name}
                          >
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Кількість"
                  labelCol={{ style: { marginBottom: -10, marginTop: 10 } }}
                  name={[field.name, 'quantity']}
                  fieldKey={[field.key, 'quantity']}
                  rules={[{ required: true, message: 'Потрібна кількість' }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber />
                </Form.Item>

                <RemoveProductItem>
                  <ProductPricePreview>
                    {productPrices[field.name]
                      ? productPrices[field.name].price
                      : 0}
                    &nbsp;грн
                    &nbsp;&nbsp;
                    {productPrices[field.name]
                      ? productPrices[field.name].calculatedCalories
                      : 0}
                    &nbsp;ккал
                  </ProductPricePreview>

                  <Button
                    type="ghost"
                    danger
                    onClick={() => remove(field.name)}
                  >
                    Видалити цей продукт
                  </Button>
                </RemoveProductItem>
              </ProductFieldsContainer>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Додати продукт
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        name="quantityFromPortion"
        label="К-сть штук з 1 порції (необов'язкове)"
        initialValue={defaultValues.quantityFromPortion}
        labelCol={{ style: { marginBottom: -10 } }}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="utilitiesPercent"
        label="Відсоток комунальних послуг (%)"
        initialValue={defaultValues.utilitiesPercent}
        labelCol={{ style: { marginBottom: -10 } }}
      >
        <InputNumber placeholder="20" />
      </Form.Item>
      <Form.Item
        name="profitPercent"
        label="Коефіцієнт прибутку"
        initialValue={defaultValues.profitPercent}
        labelCol={{ style: { marginBottom: -10 } }}
      >
        <InputNumber placeholder="200" />
      </Form.Item>

      <Button
        htmlType="button"
        type="primary"
        onClick={() => form.submit()}
        style={{ marginRight: 16 }}
      >
        {type === 'create' ? 'Створити десерт' : 'Оновити десерт'}
      </Button>
      <Link href="/desserts">
        <Button type="dashed">Скасувати</Button>
      </Link>
      <div>
        {type === 'update' ? (
          <Button
            htmlType="button"
            danger
            type="primary"          
            onClick={handleDeleteDessert}
            style={{ marginTop: 16 }}
          >
            Видалити десерт
          </Button>
        ) : null}
      </div>
    </Form>
  );
};

const ProductFieldsContainer = styled.div`
  margin: 0 0 20px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;

const RemoveProductItem = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPricePreview = styled.span`
  padding-left: 10px;
  font-size: 16px;
`;

export default DessertsForm;
