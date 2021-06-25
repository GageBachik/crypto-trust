import React from 'react';
import moment from 'moment';

const TrustCard = props => {
  const { trust } = props;

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
          <button type="button" className="btn btn-primary btn-outline border-primary">
            Load
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustCard;
