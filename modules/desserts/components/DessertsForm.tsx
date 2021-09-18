import { Form, Button, Select, InputNumber, Input } from 'antd';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { DessertFormValues } from '../desserts.model';
import { fetchAPI } from '../../../services/fetch.service';

type FormProductData = {
  productId: string;
  name: string;
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

  const submitFunction = async (data: DessertFormValues) => {
    const values = {
      name: data.name,
      profitPercent: data.profitPercent,
      utilitiesPercent: data.utilitiesPercent,
      products: data.products.map((p) => ({
        product: p.productId,
        quantity: p.quantity,
      })),
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
        `/desserts/${router.query.id}`,
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

  return (
    <Form
      form={form}
      onFinish={(data) => submitFunction(data)}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="Назва десерту"
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
                      label="Продукт"
                      name={[field.name, 'productId']}
                      fieldKey={[field.fieldKey, 'productId']}
                      rules={[{ required: true, message: 'Потрібен продукт' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Select style={{ width: 260 }}>
                        {allProducts.map((item) => (
                          <Select.Option
                            key={item.productId}
                            value={item.productId}
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
                  name={[field.name, 'quantity']}
                  fieldKey={[field.fieldKey, 'quantity']}
                  rules={[{ required: true, message: 'Потрібна кількість' }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber />
                </Form.Item>

                <RemoveProductItem onClick={() => remove(field.name)}>
                  <Button type="ghost" danger>
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
        name="utilitiesPercent"
        label="Відсоток комунальних послуг (%)"
        initialValue={defaultValues.utilitiesPercent}
      >
        <InputNumber placeholder="Мокко" />
      </Form.Item>
      <Form.Item
        name="profitPercent"
        label="Коефіцієнт прибутку"
        initialValue={defaultValues.profitPercent}
      >
        <InputNumber placeholder="200" />
      </Form.Item>

      <Button
        htmlType="button"
        type="primary"
        onClick={() => form.submit()}
        style={{ marginBottom: 50 }}
      >
        {type === 'create' ? 'Створити десерт' : 'Оновити десерт'}
      </Button>
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
  justify-content: flex-end;
`;

export default DessertsForm;
