import { InputNumber, Input, Button } from 'antd';
import ifetch from 'isomorphic-unfetch';
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

    toast.success(`Інформацію про "${values.name}" було оновлено`);
    router.push('/products');
  };

  return (
    <>
      <NavMenu />
      <Wrapper>
        <Title>Оновити продукт</Title>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputLabel>Назва продукта</InputLabel>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            defaultValue={product?.name}
            render={({ field }) => (
              <StyledInput {...field} placeholder="Наприклад: Цукор" />
            )}
          />

          <InputLabel>Ціна за одиницю товару</InputLabel>
          <Controller
            control={control}
            name="price"
            defaultValue={product?.price}
            rules={{ required: true }}
            render={({ field }) => <InputNumber {...field} />}
          />

          <div style={{ marginTop: 10, marginBottom: 50 }}>
            <Button type="primary" htmlType="submit">
              Оновити продукт
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
  margin: 10px 0;
`;

const InputLabel = styled.p`
  font-size: 16px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
`;

export default ProductDetailsPage;
