import React, { useCallback, useMemo, useState, useEffect } from 'react';
import moment from 'moment';

import CreateTrustForm from '../components/CreateTrustForm';
import TrustCard from '../components/TrustCard';

import { useContractReader } from '../hooks';

const Trusts = props => {
  const { address, tx, provider, readContracts, writeContracts, mainnetMatic } = props;

  const [showCreateTrustForm, setShowCreateTrustForm] = useState(false);
  const [TVL, setTVL] = useState({ coins: [] });

  useEffect(() => {
    const url =
      'https://api.covalenthq.com/v1/137/address/0x941AC5264e57b5875F92378166229A7089e20c55/balances_v2/?nft=true&no-nft-fetch=true&quote-currency=USD&key=ckey_b815be497ee9409ca5422514f62';
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json);
        // setTVL(json.data.items[0].quote);
        const coins = [];
        for (const coin of json.data.items) {
          if (coin.quote > 0) {
            const item = coin.contract_ticker_symbol + ' : $' + coin.quote;
            coins.push(item);
          }
        }
        setTVL({ coins });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const totalTrusts = useContractReader(readContracts, 'TrustFundManager', 'totalTrusts');
  const myTrustFund = useContractReader(readContracts, 'TrustFundManager', 'getActiveTrust', [address]);

  const totalTrustNumber = useMemo(() => {
    return totalTrusts ? totalTrusts.toNumber() : null;
  }, [totalTrusts]);

  const handleSubmit = useCallback(
    async (beneficiaryAddress, day, month, year) => {
      setShowCreateTrustForm(false);
      const matureDate = moment(`${year}-${month}-${day}`).unix();

      // console.log('currentBlockTimestamp', currentBlockTimestamp);
      // console.log('beneficiaryAddress', beneficiaryAddress);
      // console.log('matureDate', matureDate);

      // console.log('writeContracts', writeContracts);
      // console.log('writeContracts.TrustFundManager', writeContracts.TrustFundManager);

      // tx(writeContracts.TrustFundManager.deposit('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', beneficiaryAddress));
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
  // console.log('myTrustFund expiry', myTrustFund[1].toNumber());

  return (
    <div>
      <div className="mockup-window flex flex-col bg-base-300 m-10 pb-10 x-8">
        <div className="absolute right-3 top-3">
          <label htmlFor="my-modal-3" className="h-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </label>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box grid gap-4">
              <p className="italic text-xl">TOTAL VALUE LOCKED</p>
              {TVL.coins.map(coin => (
                <p className="text-secondary">{coin}</p>
              ))}
              <label htmlFor="my-modal-3" className="btn ">
                Close
              </label>
            </div>
          </div>
        </div>

        {showCreateTrustForm ? (
          <CreateTrustForm onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <button type="button" className="flex btn btn-primary mx-8" onClick={() => setShowCreateTrustForm(true)}>
            Create Trust
          </button>
        )}

        {myTrustFund && myTrustFund[1].toNumber() > 0 && (
          <TrustCard
            trust={myTrustFund}
            tx={tx}
            writeContracts={writeContracts}
            readContracts={readContracts}
            provider={provider}
            mainnetMatic={mainnetMatic}
          />
        )}
      </div>
    </div>
  );
};

export default Trusts;
