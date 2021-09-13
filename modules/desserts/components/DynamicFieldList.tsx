import { Form, Button, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

import {
  formListItemLayout,
  formListItemLayoutWithOutLabel,
  addFormItemLayout,
} from '../desserts.utils';

const controlsTextValues = {
  products: {
    label: 'Продукти',
    placeholder: 'Продукт',
    buttonName: 'Додати продукт',
  },
};

const dessertDefaultValues = {
  products: [],
};

type DynamicFieldListProps = {
  name: 'products';
  defaultValues: any;
};

const DynamicFieldList = ({ defaultValues, name }: DynamicFieldListProps) => {
  console.log(defaultValues);

  return (
    <Form>
      <Form.List
        name={name}
        initialValue={
          defaultValues[name]?.length
            ? defaultValues[name]
            : dessertDefaultValues[name]
        }
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0
                  ? formListItemLayout
                  : formListItemLayoutWithOutLabel)}
                label={index === 0 ? controlsTextValues[name].label : ''}
                required={true}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Заповнити або видалити поле',
                    },
                  ]}
                  noStyle
                >
                  {console.log(field)}
                  <Select options={[{ value: 'Werjh', label: 'any' }]} />
                </Form.Item>
                {fields.length > 1 ? (
                  <IconWrapper onClick={() => remove(field.name)}>
                    -
                  </IconWrapper>
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...addFormItemLayout}>
              <AddFieldButton type="dashed" onClick={() => add()} icon={<>+</>}>
                {controlsTextValues[name].buttonName}
              </AddFieldButton>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

const IconWrapper = styled.span`
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
`;

const AddFieldButton = styled(Button)`
  width: 83%;
`;

export default DynamicFieldList;
