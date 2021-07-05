import React, { useEffect, useState, useMemo } from 'react';
// import { StaticJsonRpcProvider } from '@ethersproject/providers';
import moment from 'moment';
import { formatEther, parseEther } from '@ethersproject/units';
import Web3 from 'web3';
import TrustModal from './TrustModal';

const TrustCard = props => {
  const { trust, tx, readContracts, writeContracts, provider, mainnetMatic } = props;
  const web3 = new Web3('https://rpc-mainnet.maticvigil.com');
  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'description',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
      name: 'getRoundData',
      outputs: [
        { internalType: 'uint80', name: 'roundId', type: 'uint80' },
        { internalType: 'int256', name: 'answer', type: 'int256' },
        { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
        { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
        { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'latestRoundData',
      outputs: [
        { internalType: 'uint80', name: 'roundId', type: 'uint80' },
        { internalType: 'int256', name: 'answer', type: 'int256' },
        { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
        { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
        { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const [currPrice, setCurrPrice] = useState(0);
  const addr = '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0';
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
  priceFeed.methods
    .latestRoundData()
    .call()
    .then(roundData => {
      // Do something with roundData
      // console.log('Latest Round Data', roundData);
      setCurrPrice(roundData.answer / 100000000);
    });

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
          <p>Token: Matic ${(formatEther(trust[3].toString()) * currPrice).toFixed(2)}</p>
        </div>
        <div>
          {currentBlockTimestamp > trust[1].toNumber() && (
            <button
              type="button"
              className="btn btn-secondary btn-outline border-secondary m-1"
              onClick={() => {
                tx(writeContracts.TrustFundManager.withdrawTrust(trust[0]));
              }}
            >
              Withdraw
            </button>
          )}
          {/* <button
            type="button"
            className="btn btn-primary btn-outline border-primary"
            onClick={() => {
              tx(
                writeContracts.TrustFundManager.deposit(
                  '0x0000000000000000000000000000000000000000',
                  trust[0],
                  '1000000000000000',
                  {
                    value: parseEther('0.01'),
                  },
                ),
              );
              tx(readContracts.TrustFundManager.balances('0xaF443f64B078d31b81A8E044895B56696518d803'));
            }}
          >
            Load
          </button> */}
          <label htmlFor="my-modal-2" className="btn btn-primary m-1">
            Load
          </label>
          <input type="checkbox" id="my-modal-2" className="modal-toggle m-1" />
          <TrustModal
            trust={trust}
            tx={tx}
            writeContracts={writeContracts}
            readContracts={readContracts}
            provider={provider}
            mainnetMatic={mainnetMatic}
          />
        </div>
      </div>
    </div>
  );
};

export default TrustCard;
