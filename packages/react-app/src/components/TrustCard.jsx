import React from 'react';
import moment from 'moment';
import { parseEther } from '@ethersproject/units';

const TrustCard = props => {
  const { trust, tx, writeContracts, readContracts } = props;

  return (
    <div className="p-8">
      <div className="card flex flex-row items-center shadow bg-base-200 p-4">
        <div className="card-body text-left">
          <h2 className="card-title">My Trust Fund</h2>
          <p>{trust[0]}</p>
          <p>Unlocks: {moment.unix(trust[1].toNumber()).format('dddd, MMMM Do YYYY')}</p>
          <p>Value: {trust[2]}</p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-outline border-primary"
            onClick={() => {
              tx(
                writeContracts.TrustFundManager.deposit('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', trust[0], {
                  value: parseEther('0.001'),
                }),
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
