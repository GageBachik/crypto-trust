import React, { useState } from 'react';

// import { Button, Layout } from 'antd';
import CreateTrustForm from '../components/CreateTrustForm';

// const { Content } = Layout;

const Trusts = () => {
  const [showCreateTrustForm, setShowCreateTrustForm] = useState(true);

  return (
    // <Layout style={{ height: '100%' }}>
    //   <Content style={{ marginTop: 32 }}>
    //     <Button type="primary" onClick={() => setShowCreateTrustForm(true)}>
    //       Create Trust
    //     </Button>

    //     {showCreateTrustForm && <CreateTrustForm />}
    //   </Content>
    // </Layout>

    // Welcome to daisy bitch
    <div className="mockup-window flex flex-col bg-base-300 m-10 x-8">
      <button type="button" className="flex btn btn-primary mx-8">
        Create Trust
      </button>

      <div className="p-8">
        <div className="card flex flex-row items-center shadow bg-secondary p-4">
          <div className="card-body text-left">
            <h2 className="card-title">Trust 1</h2>
            <p>$99,999</p>
          </div>
          <div>
            <button type="button" className="btn btn-accent">
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trusts;
