import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import { path } from 'ramda';
import { ethers } from 'ethers';

import CreateTrustForm from '../components/CreateTrustForm';
import TrustCard from '../components/TrustCard';

import { useContractReader } from '../hooks';

const Trusts = props => {
  const { address, tx, provider, readContracts, writeContracts } = props;

  const [showCreateTrustForm, setShowCreateTrustForm] = useState(true);

  const totalTrusts = useContractReader(readContracts, 'TrustFundManager', 'totalTrusts');
  const myTrustFund = useContractReader(readContracts, 'TrustFundManager', 'getActiveTrust', [address]);

  const totalTrustNumber = useMemo(() => {
    return totalTrusts ? totalTrusts.toNumber() : null;
  }, [totalTrusts]);

  const getCurrentBlockTimestamp = useCallback(async () => {
    const block = await provider.getBlock();

    return block.timestamp;
  }, [provider]);

  const handleSubmit = useCallback(
    async (beneficiaryAddress, day, month, year) => {
      const matureDate = moment(`${year}-${month}-${day}`).unix();

      // console.log('currentBlockTimestamp', currentBlockTimestamp);
      // console.log('beneficiaryAddress', beneficiaryAddress);
      // console.log('matureDate', matureDate);

      console.log('writeContracts', writeContracts);
      console.log('writeContracts.TrustFundManager', writeContracts.TrustFundManager);

      tx(writeContracts.TrustFundManager.deposit('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', beneficiaryAddress));
      tx(writeContracts.TrustFundManager.createTrust(beneficiaryAddress, matureDate));

      console.log('DONE');
    },
    [tx, writeContracts],
  );

  const handleCancel = useCallback(() => {
    setShowCreateTrustForm(false);
  }, []);

  // console.log('writeContracts', writeContracts);
  // console.log('totalTrusts', totalTrusts);
  console.log('totalTrustNumber', totalTrustNumber);
  console.log('myTrustFund', myTrustFund);

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

      {myTrustFund && (
        <TrustCard trust={myTrustFund} tx={tx} writeContracts={writeContracts} readContracts={readContracts} />
      )}
    </div>
  );
};

export default Trusts;
