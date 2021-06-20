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
    <div className="mockup-window bg-base-300 m-10">
      <div className="flex justify-center px-4 py-16 bg-base-200">
        <div className="hero h-1/2 bg-base-200">
          <div className="text-center hero-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Fully automated trust funds</h1>
              <p className="mb-5">
                Crypto trusts are the first ever trust funds that allow the trustee to earn yield on their future funds.
                We are a platform for autmated handling of fund dispersion after the trust term ends.
              </p>
              <button className="btn btn-primary" type="button">
                Create Trust
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trusts;
