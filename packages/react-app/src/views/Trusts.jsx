import React from 'react';

import { Button, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Trusts = () => {
  return (
    <Layout style={{height: '100%'}}>
      <Content style={{marginTop: 32}}>
        <Button type="primary">Create Trust</Button>
      </Content>
    </Layout>
  );
}

export default Trusts;