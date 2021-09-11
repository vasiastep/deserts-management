import { Table } from 'antd';
import React from 'react';

import NavMenu from '../../../shared-components/NavMenu';

const mockData = [
  { name: 'Цукор', price: 50, key: '1' },
  { name: 'Мигдалева мука', price: 300, key: '2' },
];

const ProductsPage = () => {
  return (
    <>
      <NavMenu />
      <Table dataSource={mockData}>
        <Table.Column
          key="name"
          title="Продукт"
          render={(product: any) => product.name}
        />
        <Table.Column
          key="price"
          title="Ціна за кг"
          render={(product: any) => `${product.price} грн`}
        />
      </Table>
    </>
  );
};

export default ProductsPage;
