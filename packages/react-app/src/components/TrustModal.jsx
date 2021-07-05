import React, { useRef, useCallback } from 'react';
import { formatEther, parseEther } from '@ethersproject/units';

const TrustModal = props => {
  const { trust, tx, writeContracts } = props;

  const amountRef = useRef();
  const tokenRef = useRef();

  const handleSubmit = useCallback(() => {
    const amount = amountRef.current ? amountRef.current.value : null;
    const token = tokenRef.current ? tokenRef.current.value : '0x0000000000000000000000000000000000000000';

    tx(
      writeContracts.TrustFundManager.deposit(
        '0x0000000000000000000000000000000000000000',
        trust[0],
        '1000000000000000',
        {
          value: parseEther(amount),
        },
      ),
    );
  }, []);

  return (
    <div className="modal">
      <div className="modal-box">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount:</span>
          </label>
          <input ref={amountRef} type="text" placeholder="Amount" className="input" defaultValue="0.001" />
          <label className="label">
            <span className="label-text">Token</span>
          </label>
          <div className="grid grid-cols-1 grid-rows-1 gap-4">
            <select ref={tokenRef} className="select select-bordered row-span-1">
              <option>Custom</option>
              <option>ETH</option>
              <option>DAI</option>
              <option>USDC</option>
              <option>USDT</option>
              <option selected>MATIC</option>
            </select>
          </div>
        </div>
        <div className="modal-action">
          <label htmlFor="my-modal-2" className="btn w-1/2">
            Cancel
          </label>
          <label type="button" htmlFor="my-modal-2" className="btn btn-primary w-1/2" onClick={handleSubmit}>
            Fund
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrustModal;
