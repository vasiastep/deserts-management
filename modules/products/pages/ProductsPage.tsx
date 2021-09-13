import { Table, Button } from 'antd';
import ifetch from 'isomorphic-unfetch';
import Link from 'next/link';
import React from 'react';

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

  return (
    <>
      <NavMenu />
      <Link href="/products/create" passHref>
        <Button type="primary" style={{ margin: '10px 5px' }}>
          + Додати новий продукт
        </Button>
      </Link>
      <Table dataSource={productsWithKeys}>
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
    </>
  );
};

ProductsPage.getInitialProps = async () => {
  const result = await ifetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products`,
  ).then((res) => res.json());

  return { products: result.data };
};

export default ProductsPage;
