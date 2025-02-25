import React from "react";

const CashOut = () => {
  const handleCashOut = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const agentNumber = formData.get("agent-number");
    const amount = formData.get("amount");
    const pin = formData.get("pin");
    const cashOutInfo = {
      agentNumber,
      amount,
      pin,
    };
    console.log(cashOutInfo);
  };
  return (
    <>
      <h2 className="text-center text-3xl font-bold  text-purple-700">
        Cash Out Money
      </h2>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-purple-600">
          <form onSubmit={handleCashOut} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Agent Number</span>
              </label>
              <input
                type="number"
                name="agent-number"
                placeholder="Enter Agent Number"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter cash out amount"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PIN</span>
              </label>
              <input
                type="password"
                name="pin"
                placeholder="Enter your pin number"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>

            <div className="form-control mt-6">
              {/* {loading ? (
                <ButtonLoading width="w-full"></ButtonLoading>
              ) : (
                <button className="btn font-semibold text-base bg-purple-600 hover:bg-purple-700 text-white">
                  Add Task
                </button>
              )} */}
              <button className="btn font-semibold text-base bg-purple-600 hover:bg-purple-700 text-white">
                Cash Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CashOut;
