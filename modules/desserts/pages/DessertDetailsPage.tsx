import React from 'react';

// import DynamicFieldList from '../components/DynamicFieldList';

const DessertDetailsPage = () => {
  return (
    <div>
      {/* <DynamicFieldList
        name="products"
        defaultValues={{ products: [{ _id: '2342342', name: 'Цукор' }] }}
      /> */}
    </div>
  );
};

DessertDetailsPage.getInitialProps = async (ctx: any) => {
  console.log(ctx);

  return {};
};

export default DessertDetailsPage;
