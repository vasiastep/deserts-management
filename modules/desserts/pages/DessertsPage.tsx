import { Table, Button, Input } from 'antd';
import ifetch from 'isomorphic-unfetch';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

import { DessertModel } from '../../../api/modules/desserts/dessert.model';
import NavMenu from '../../../shared-components/NavMenu';
import {
  getFullPrice,
  getPriceForTheItemFromPortion,
  getUtilityPrices,
  getPriceForProducts,
} from '../desserts.utils';

type DessertsPageProps = {
  desserts: DessertModel[];
};

const DessertsPage = ({ desserts }: DessertsPageProps) => {
  const dessertsWithKeys = desserts.map((d) => ({
    ...d,
    key: d._id,
  }));
  const [dessertsList, setDessertsList] = useState(dessertsWithKeys);

  return (
    <>
      <NavMenu />
      <DessertsPageHeader>
        <FiltersWrapper>
          <Input
            placeholder="Пошук по назві десерту"
            onChange={(e) =>
              setDessertsList(
                dessertsWithKeys.filter((des) =>
                  des.name
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase()),
                ),
              )
            }
          />
        </FiltersWrapper>
        <Link href="/desserts/create" passHref>
          <Button type="primary" style={{ margin: '10px 5px' }}>
            + Додати десерт
          </Button>
        </Link>
      </DessertsPageHeader>
      <TableWrapper>
        <Table dataSource={dessertsList}>
          <Table.Column
            key="name"
            title="Десерт"
            render={(dessert: DessertModel) => (
              <Link href={`/desserts/${dessert._id}`} passHref>
                <a>{dessert.name}</a>
              </Link>
            )}
          />
          <Table.Column
            key="fullPrice"
            title="Повна ціна"
            render={(dessert: DessertModel) => (
              <div style={{ width: 100 }}>
                {getFullPrice(dessert).toFixed(1)} грн
              </div>
            )}
          />
          <Table.Column
            key="fullPrice"
            title="Ціна 1шт з порції"
            render={(dessert: DessertModel) => (
              <div style={{ width: 100 }}>
                {getPriceForTheItemFromPortion(dessert)}
              </div>
            )}
          />
          <Table.Column
            key="priceWithUtilities"
            title="Cвітло + вода"
            render={(dessert: DessertModel) => (
              <div>{getUtilityPrices(dessert).toFixed(1)} грн</div>
            )}
          />
          <Table.Column
            key="cost"
            title="Собівартість"
            render={(dessert: DessertModel) => (
              <div>{getPriceForProducts(dessert).toFixed(1)} грн</div>
            )}
          />
        </Table>
      </TableWrapper>
    </>
  );
};

DessertsPage.getInitialProps = async () => {
  const result = await ifetch(
    `${process.env.NEXT_PUBLIC_URL}/api/desserts`,
  ).then((res) => res.json());

  return { desserts: result.data };
};

const TableWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const FiltersWrapper = styled.div`
  width: 150px;
  margin-left: 10px;
`;

const DessertsPageHeader = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default DessertsPage;
