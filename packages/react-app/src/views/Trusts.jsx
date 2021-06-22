import React, { useCallback, useState } from 'react';

// import { Button, Layout } from 'antd';
import CreateTrustForm from '../components/CreateTrustForm';

// const { Content } = Layout;

const Trusts = () => {
  const [showCreateTrustForm, setShowCreateTrustForm] = useState(true);

  const handleCancel = useCallback(() => {
    setShowCreateTrustForm(false);
  }, []);

  return (
    // Welcome to daisy bitch
    <div className="mockup-window flex flex-col bg-base-300 m-10 x-8">
      {showCreateTrustForm ? (
        <CreateTrustForm onCancel={handleCancel} />
      ) : (
        <button type="button" className="flex btn btn-primary mx-8" onClick={() => setShowCreateTrustForm(true)}>
          Create Trust
        </button>
      )}

      <div className="p-8">
        <div className="card flex flex-row items-center shadow bg-base-200 p-4">
          <div className="card-body text-left">
            <h2 className="card-title">Trust 1</h2>
            <p>$99,999</p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-outline border-primary">
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trusts;
