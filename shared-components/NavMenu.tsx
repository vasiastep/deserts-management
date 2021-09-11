import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavMenu = () => {
  const router = useRouter();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Menu
      mode="horizontal"
      style={{ width: '100%' }}
      activeKey={
        router.pathname.includes('products')
          ? 'products'
          : router.pathname.includes('desserts')
          ? 'desserts'
          : ''
      }
    >
      <Menu.Item key="desserts">
        <Link href="/desserts">Десерти</Link>
      </Menu.Item>
      <Menu.Item key="products">
        <Link href="/products">Продукти</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
