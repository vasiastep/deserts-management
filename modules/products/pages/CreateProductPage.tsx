import { Input, InputNumber, Button } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import NavMenu from '../../../shared-components/NavMenu';
import { fetchAPI } from '../../../services/fetch.service';

type ProductFormValues = {
  name: string;
  price: number;
};

const CreateProductPage = () => {
  const { control, handleSubmit } = useForm();

  const handleCreateProduct = async (values: ProductFormValues) => {
    const res = await fetchAPI('/products/create', 'POST', values);

    if (!res.success && res.message === 'Already exists') {
      return toast.error("Продукт з таким ім'ям вже існує");
    }

    if (!res.success) {
      return toast.error('Щось пішло не так');
    }

    toast.success(`${values.name} було додано до списку продуктів`);
    Router.push('/products');
  };

  return (
    <>
      <NavMenu />
      <Wrapper>
        <Title>Створити новий продукт</Title>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputLabel htmlFor="name">Назва продукта</InputLabel>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <StyledInput {...field} placeholder="Наприклад: Цукор" />
            )}
          />

          <InputLabel htmlFor="price">Ціна за одиницю товару</InputLabel>
          <InputNumberWrapper>
            <Controller
              control={control}
              name="price"
              defaultValue={0}
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
              Створити продукт
            </Button>
            <Link href="/products">
              <Button type="dashed">Скасувати</Button>
            </Link>
          </div>
        </form>
      </Wrapper>
    </>
  );
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

export default CreateProductPage;
