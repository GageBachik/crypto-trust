import React, { useCallback, useRef } from 'react';

const CreateTrustForm = props => {
  const { onSubmit, onCancel } = props;

  const addressRef = useRef();
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  const handleSubmit = useCallback(() => {
    const address = addressRef.current ? addressRef.current.value : null;
    const day = dayRef.current ? dayRef.current.value : null;
    const month = monthRef.current ? monthRef.current.value : null;
    const year = yearRef.current ? yearRef.current.value : null;

    onSubmit(address, day, month, year);
  }, [onSubmit]);

  return (
    <div className="p-10 card bg-base-200 mx-8">
      <div className="form-control">
        <label className="label">
          <span className="label-text">{"Beneficiary's Address"}</span>
        </label>
        <input ref={addressRef} type="text" placeholder="Address" className="input" defaultValue="0x0000" />
        <label className="label">
          <span className="label-text">Fund Unlock Date</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <select ref={dayRef} className="select select-bordered w-full ">
            <option>Day</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option selected>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
          </select>
          <select ref={monthRef} className="select select-bordered w-full">
            <option>Month</option>
            <option selected>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
            <option>Jun</option>
            <option>July</option>
            <option>Aug</option>
            <option>Sep</option>
            <option>Oct</option>
            <option>Nov</option>
            <option>Dec</option>
          </select>
          <select ref={yearRef} className="select select-bordered w-full ">
            <option>Year</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option selected>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>
            <option>2030</option>
            <option>2031</option>
            <option>2032</option>
            <option>2033</option>
            <option>2034</option>
            <option>2035</option>
            <option>2036</option>
            <option>2037</option>
            <option>2038</option>
            <option>2039</option>
            <option>2040</option>
            <option>2041</option>
            <option>2042</option>
            <option>2043</option>
            <option>2044</option>
            <option>2045</option>
            <option>2046</option>
            <option>2047</option>
            <option>2048</option>
            <option>2049</option>
          </select>
        </div>
        <button className="btn btn-primary mt-8" type="button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-ghost mt-2" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateTrustForm;
