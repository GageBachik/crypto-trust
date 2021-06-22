import React, { useCallback } from 'react';

const CreateTrustForm = () => {
  const onSubmit = useCallback(() => {}, []);

  const onSubmitFailed = useCallback(() => {}, []);

  return (
    <>
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
          <label className="label">
            <span className="label-text">Fund Unlock Date</span>
          </label>
          <select className="select select-bordered w-full max-w-xs">
            <option>One month</option>
            <option>One Year</option>
            <option>One Decade</option>
          </select>
          <button className="btn btn-primary mt-8" type="button">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTrustForm;
