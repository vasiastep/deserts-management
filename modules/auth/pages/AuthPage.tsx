import { Input, Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { setCookie } from 'nookies';

import { fetchAPI } from '../../../services/fetch.service';

type AuthFormValues = {
  email: string;
  password: string;
};

const AuthPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const formHandler = (values: AuthFormValues) => {
    authenticate(values);
  };

  const authenticate = async (values: AuthFormValues) => {
    const result = await fetchAPI('/auth', 'POST', values);

    if (!result.success) {
      toast.error('Дані невірні, спробуйте ще раз');
    }

    if (result.success) {
      setCookie(null, 'token', result.data.token, {
        maxAge: 30 * 24 * 60 * 60 * 60,
        path: '/',
      });

      setCookie(null, 'user', result.data.user, {
        maxAge: 30 * 24 * 60 * 60 * 60,
        path: '/',
      });

      router.push('/desserts');
    }
  };

  return (
    <Wrapper>
      <Title>Авторизація</Title>
      <form onSubmit={handleSubmit(formHandler)}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => <StyledInput {...field} placeholder="Email" />}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => (
            <StyledInput {...field} placeholder="Password" type="password" />
          )}
        />
        <Button type="primary" htmlType="submit">
          Авторизуватись
        </Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 10px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
`;

export default AuthPage;
