import React from 'react';
import styled from 'styled-components';

import { ProductModel } from '../../../api/modules/products/product.model';
import NavMenu from '../../../shared-components/NavMenu';
import DessertsForm from '../components/DessertsForm';

type CreateDessertPageProps = {
  products: { productId: string; name: string }[];
};

const dessertDefaultValues = {
  name: '',
  products: [],
  utilitiesPercent: 20,
  profitPercent: 0,
};

const CreateDessertPage = ({ products }: CreateDessertPageProps) => {
  return (
    <>
      <NavMenu />
      <DessertsPageWrapper>
        <DessertsForm
          allProducts={products}
          defaultValues={dessertDefaultValues}
          type="create"
        />
      </DessertsPageWrapper>
    </>
  );
};

CreateDessertPage.getInitialProps = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products`,
  ).then((res) => res.json());

  const products = result.data.map((product: ProductModel) => ({
    productId: product._id,
    name: product.name,
  }));

  return { products };
};

const DessertsPageWrapper = styled.div`
  padding: 0 10px;
`;

export default CreateDessertPage;
