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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
          <h1 className="fles-grow sm:pr-16 text-2xl font-medium title-fon text-gray-900">
            The worlds first fully automated yield earning trust fund. Powered by crypto.
          </h1>
          <button
            className="flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-8 focuse:outline-none hover-:bg-blue-600 rounded text-lg mt-to sm:mt-0"
            type="button"
          >
            Create Trust
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trusts;
