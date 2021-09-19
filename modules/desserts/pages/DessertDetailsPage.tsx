import ifetch from 'isomorphic-unfetch';
import React from 'react';
import styled from 'styled-components';

import { DessertModel } from '../../../api/modules/desserts/dessert.model';
import { ProductModel } from '../../../api/modules/products/product.model';
import NavMenu from '../../../shared-components/NavMenu';
import DessertsForm from '../components/DessertsForm';

type DessertDetailsPageProps = {
  products: { productId: string; name: string }[];
  dessert: DessertModel;
};

const DessertDetailsPage = ({ products, dessert }: DessertDetailsPageProps) => {
  const dessertDefaultValues = {
    name: dessert.name ?? '',
    products: dessert.products.map((d) => ({
      productId: (d.product as ProductModel)._id,
      quantity: d.quantity,
    })),
    utilitiesPercent: dessert.utilitiesPercent ?? 0,
    profitPercent: dessert.profitPercent ?? 0,
  };

  return (
    <>
      <NavMenu />
      <DessertsPageWrapper>
        <Title>Оновити десерт</Title>
        <DessertsForm
          allProducts={products}
          defaultValues={dessertDefaultValues}
          type="update"
        />
      </DessertsPageWrapper>
    </>
  );
};

DessertDetailsPage.getInitialProps = async (ctx: any) => {
  const result = await ifetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products`,
  ).then((res) => res.json());

  const products = result.data.map((product: ProductModel) => ({
    productId: product._id,
    name: product.name,
  }));

  const dessertData = await ifetch(
    `${process.env.NEXT_PUBLIC_URL}/api/desserts/update?id=${ctx.query.id}`,
  ).then((res) => res.json());

  return { products, dessert: dessertData.data };
};

const DessertsPageWrapper = styled.div`
  padding: 0 10px;
`;

const Title = styled.p`
  font-size: 26px;
  margin: 10px 0 12px;
  text-align: center;
  color: ${(props) => props.theme.colors.dark1};
`;

export default DessertDetailsPage;
