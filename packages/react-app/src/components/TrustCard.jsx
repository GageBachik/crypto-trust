import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { parseEther } from '@ethersproject/units';

const TrustCard = props => {
  const { trust, tx, writeContracts, readContracts, provider } = props;
  const [currentBlockTimestamp, setCurrentBlockTimestamp] = useState(null);

  const getCurrentBlockTimestamp = useEffect(() => {
    async function fetchTimestamp() {
      const block = await provider.getBlock();
      // console.log('-- BLOCK --', block);
      // console.log('-- BLOCK TIMESTAMP --', block.timestamp);
      setCurrentBlockTimestamp(block.timestamp);
    }
    fetchTimestamp();
  }, [provider]);

  // console.log('comp', currentBlockTimestamp, trust[1].toNumber());

  return (
    <div className="p-8">
      <div className="card flex flex-row items-center shadow bg-base-200 p-4">
        <div className="card-body text-left">
          <h2 className="card-title">My Trust Fund</h2>
          <p>{trust[0]}</p>
          <p>Unlocks: {moment.unix(trust[1].toNumber()).format('dddd, MMMM Do YYYY')}</p>
          <p>
            Token: {trust[2].toString()} | Value: {trust[3].toString()}
          </p>
        </div>
        <div>
          {currentBlockTimestamp > trust[1].toNumber() && (
            <button
              type="button"
              className="btn btn-secondary btn-outline border-secondary"
              onClick={() => {
                tx(writeContracts.TrustFundManager.withdrawTrust(trust[0]));
              }}
            >
              Withdraw
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary btn-outline border-primary"
            onClick={() => {
              tx(
                writeContracts.TrustFundManager.deposit(
                  '0x0000000000000000000000000000000000000000',
                  trust[0],
                  '1000000000000000',
                  {
                    value: parseEther('0.001'),
                  },
                ),
              );
              tx(readContracts.TrustFundManager.balances('0xaF443f64B078d31b81A8E044895B56696518d803'));
            }}
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustCard;
