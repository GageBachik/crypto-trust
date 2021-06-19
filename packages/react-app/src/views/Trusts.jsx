import React, { useState } from 'react';

import { Button, Layout } from 'antd';
import CreateTrustForm from '../components/CreateTrustForm';

const { Header, Footer, Sider, Content } = Layout;

const Trusts = () => {
  const [showCreateTrustForm, setShowCreateTrustForm] = useState(false);

  return (
    <Layout style={{ height: '100%' }}>
      <Content style={{ marginTop: 32 }}>
        <Button type="primary">Create Trust</Button>

        {showCreateTrustForm && <CreateTrustForm />}
      </Content>
    </Layout>
  );
};

export default Trusts;
