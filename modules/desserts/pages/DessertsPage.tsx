import { Table } from 'antd';
import React from 'react';

import NavMenu from '../../../shared-components/NavMenu';

const mockData = [
  { name: 'Торт "Крила Ангела"', price: 500, key: '1' },
  { name: 'Торт "Снікерс"', price: 600, key: '2' },
];

const DessertsPage = () => {
  return (
    <>
      <NavMenu />
      <Table dataSource={mockData}>
        <Table.Column
          key="name"
          title="Десерт"
          render={(dessert: any) => dessert.name}
        />
        <Table.Column
          key="price"
          title="Ціна за кг"
          render={(dessert: any) => `${dessert.price} грн`}
        />
      </Table>
    </>
  );
};

export default DessertsPage;
