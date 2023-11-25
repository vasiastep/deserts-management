import { InputNumber, Input, Button } from 'antd';
import ifetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { ProductModel } from '../../../api/modules/products/product.model';
import { fetchAPI } from '../../../services/fetch.service';
import NavMenu from '../../../shared-components/NavMenu';

type ProductDetailsPageProps = {
  product?: ProductModel;
};

const ProductDetailsPage = ({ product }: ProductDetailsPageProps) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const handleUpdateProduct = async (values: any) => {
    const res = await fetchAPI(
      `/products/update?id=${product?._id}`,
      'PUT',
      values,
    );

    if (!res.success) {
      return toast.error('Щось пішло не так');
    }

    toast.success(`Інформацію про "${values.name}" було оновлено`, {  });
    router.push('/products');
  };

  const handleDeleteProduct = async () => {
    const res = await fetchAPI(
      `/products/update?id=${product?._id}`,
      'DELETE',
    );

    if (!res.success) {
      return toast.error('Не вдалось видалити продукт');
    }

    toast.success("Продукт було успішно видалено");
    router.push('/products');
  };

  return (
    <>
      <NavMenu />
      <Wrapper>
        <Title>Оновити продукт</Title>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputLabel htmlFor="name">Назва продукта</InputLabel>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            defaultValue={product?.name}
            render={({ field }) => (
              <StyledInput {...field} placeholder="Наприклад: Цукор" />
            )}
          />

          <InputLabel htmlFor="price">Ціна за одиницю товару</InputLabel>
          <InputNumberWrapper>
            <Controller
              control={control}
              name="price"
              defaultValue={product?.price}
              rules={{ required: true }}
              render={({ field }) => <InputNumber {...field} />}
            />
          </InputNumberWrapper>

          <InputLabel htmlFor="caloricContent">Калорійність в 100г</InputLabel>
          <InputNumberWrapper>
            <Controller
              control={control}
              name="caloricContent"
              defaultValue={product?.caloricContent}
              rules={{ required: true }}
              render={({ field }) => <InputNumber {...field} />}
            />
          </InputNumberWrapper>

          <div style={{ marginTop: 24, marginBottom: 50 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              Оновити продукт
            </Button>
            <Link href="/products">
              <Button type="dashed">Скасувати</Button>
            </Link>
            <Button
              type="primary"
              danger
              onClick={handleDeleteProduct}
              style={{ marginLeft: 20 }}
            >
              Видалити продукт
            </Button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

ProductDetailsPage.getInitialProps = async (ctx: any) => {
  const result = await ifetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products/update?id=${ctx.query.id}`,
  ).then((res) => res.json());

  return { product: result.data };
};

const Wrapper = styled.div`
  padding: 0 16px;
`;

const Title = styled.p`
  font-size: 26px;
  margin: 10px 0 12px;
  text-align: center;
  color: ${(props) => props.theme.colors.dark1};
`;

const InputLabel = styled.label`
  font-size: 16px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
  margin-top: 5px;
`;

const InputNumberWrapper = styled.div`
  margin-top: 5px;
`;

export default ProductDetailsPage;
