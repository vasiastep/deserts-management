import { Table, Button, Input } from 'antd';
import ifetch from 'isomorphic-unfetch';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

import { ProductModel } from '../../../api/modules/products/product.model';
import NavMenu from '../../../shared-components/NavMenu';

type ProductsPageProps = {
  products: ProductModel[];
};

const ProductsPage = ({ products }: ProductsPageProps) => {
  const productsWithKeys = products.map((p) => ({
    ...p,
    key: p._id,
  }));
  const [productsList, setProductsList] = useState(productsWithKeys);

  return (
    <>
      <NavMenu />
      <ProductsPageHeader>
        <FiltersWrapper>
          <Input
            placeholder="Пошук по назві продукту"
            onChange={(e) =>
              setProductsList(
                productsWithKeys.filter((des) =>
                  des.name
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase()),
                ),
              )
            }
          />
        </FiltersWrapper>
        <Link href="/products/create" passHref>
          <Button type="primary" style={{ margin: '10px 5px' }}>
            + Додати продукт
          </Button>
        </Link>
      </ProductsPageHeader>
      <TableWrapper>
        <Table dataSource={productsList}>
          <Table.Column
            key="name"
            title="Продукт"
            render={(product: ProductModel) => (
              <Link href={`/products/${product._id}`}>
                <a>{product.name}</a>
              </Link>
            )}
          />
          <Table.Column
            key="price"
            title="Ціна за кг"
            render={(product: ProductModel) => `${product.price} грн`}
          />
        </Table>
      </TableWrapper>
    </>
  );
};

ProductsPage.getInitialProps = async () => {
  const result = await ifetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products`,
  ).then((res) => res.json());

  return { products: result.data };
};

const TableWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const FiltersWrapper = styled.div`
  width: 180px;
  margin-left: 10px;
`;

const ProductsPageHeader = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ProductsPage;
