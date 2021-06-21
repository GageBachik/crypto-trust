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
            <div className="rounded-lg bg-base-200 drawer h-100">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="flex flex-col items-center justify-center drawer-content">
                <h1 className="mb-5 text-5xl font-bold">Fully automated trust funds</h1>
                <p className="mb-5 max-w-md">
                  Crypto trusts are the first ever trust funds that allow the trustee to earn yield on their future
                  funds. We are a platform for autmated handling of fund dispersion after the trust term ends.
                </p>

                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                  Create Trust
                </label>
              </div>

              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay" />
                <div className="p-10 card bg-base-200">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Delivery Address</span>
                    </label>
                    <input type="text" placeholder="Address" className="input" />
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea className="textarea h-24 textarea-bordered" placeholder="description" />
                    <select className="select select-bordered w-full max-w-xs">
                      <option disabled="disabled" selected="selected">
                        Fund unlock date
                      </option>
                      <option>One month</option>
                      <option>One Year</option>
                      <option>One Decade</option>
                    </select>
                    <button className="btn btn-primary" type="button">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trusts;
