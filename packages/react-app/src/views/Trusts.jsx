import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import { path } from 'ramda';
import { ethers } from 'ethers';

import CreateTrustForm from '../components/CreateTrustForm';

import { useContractReader } from '../hooks';

const Trusts = props => {
  const { tx, provider, readContracts, writeContracts } = props;

  const [showCreateTrustForm, setShowCreateTrustForm] = useState(true);

  const totalTrusts = useContractReader(readContracts, 'TrustFundManager', 'totalTrusts');

  const getCurrentBlockTimestamp = useCallback(async () => {
    const block = await provider.getBlock();

    return block.timestamp;
  }, [provider]);

  const handleSubmit = useCallback(
    async (address, day, month, year) => {
      const matureDate = moment(`${year}-${month}-${day}`).unix();

      // console.log('currentBlockTimestamp', currentBlockTimestamp);
      // console.log('address', address);
      // console.log('matureDate', matureDate);

      console.log('writeContracts', writeContracts);
      console.log('writeContracts.TrustFundManager', writeContracts.TrustFundManager);

      tx(writeContracts.TrustFundManager.createTrust(address, matureDate));

      console.log('DONE');
    },
    [tx, writeContracts],
  );

  const handleCancel = useCallback(() => {
    setShowCreateTrustForm(false);
  }, []);

  // console.log('writeContracts', writeContracts);
  console.log('totalTrusts', totalTrusts);

  return (
    // Welcome to daisy bitch
    <div className="mockup-window flex flex-col bg-base-300 m-10 x-8">
      {showCreateTrustForm ? (
        <CreateTrustForm onSubmit={handleSubmit} onCancel={handleCancel} />
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
