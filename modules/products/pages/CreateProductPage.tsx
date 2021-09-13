import { Input, InputNumber, Button } from 'antd';
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
          <InputLabel>Назва продукта</InputLabel>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <StyledInput {...field} placeholder="Наприклад: Цукор" />
            )}
          />

          <InputLabel>Ціна за одиницю товару</InputLabel>
          <Controller
            control={control}
            name="price"
            defaultValue={0}
            rules={{ required: true }}
            render={({ field }) => <InputNumber {...field} />}
          />

          <div>
            <Button type="primary" htmlType="submit">
              Створити
            </Button>
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
  margin: 10px 0;
`;

const InputLabel = styled.p`
  font-size: 16px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
`;

export default CreateProductPage;
