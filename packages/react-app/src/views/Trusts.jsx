import React, { useState } from 'react';

import { Button, Layout } from 'antd';
import CreateTrustForm from '../components/CreateTrustForm';

const { Content } = Layout;

const Trusts = () => {
  const [showCreateTrustForm, setShowCreateTrustForm] = useState(true);

  return (
    <Layout style={{ height: '100%' }}>
      <Content style={{ marginTop: 32 }}>
        <Button type="primary" onClick={() => setShowCreateTrustForm(true)}>
          Create Trust
        </Button>

        {showCreateTrustForm && <CreateTrustForm />}
      </Content>
    </Layout>
  );
};

export default Trusts;
