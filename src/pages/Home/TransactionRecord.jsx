const TransactionDummyData = [
  { From: 1, To: "$200", Amount: "$200", Type: "$200" },
  { From: 2, To: "$200", Amount: "$200", Type: "$200" },
  { From: 3, To: "$200", Amount: "$200", Type: "$200" },
  { From: 4, To: "$200", Amount: "$200", Type: "$200" },
  { From: 5, To: "$200", Amount: "$200", Type: "$200" },
  { From: 6, To: "$200", Amount: "$200", Type: "$200" },
  { From: 7, To: "$200", Amount: "$200", Type: "$200" },
  { From: 8, To: "$200", Amount: "$200", Type: "$200" },
  { From: 9, To: "$200", Amount: "$200", Type: "$200" },
  { From: 10, To: "$200", Amount: "$200", Type: "$200" },
];

const TransactionRecord = () => {
  return (
    <div>
      <p className="text-[#FFCF56] text-center text-3xl md:text-4xl font-bold pt-10 pb-10">
        Transactions Record
      </p>

      {/* Table */}
      <div className="px-6 md:px-8 lg:px-16 2xl:px-24 pb-20">
        <div className="flex flex-row justify-between border-b-[1px] border-[#454545] pb-2">
          <span className="text-white text-lg font-bold">FROM</span>
          <span className="text-white text-lg font-bold">TO</span>
          <span className="text-white text-lg font-bold">AMOUNT</span>
          <span className="text-white text-lg font-bold">TYPE</span>
        </div>

        {TransactionDummyData.map((data, index) => (
          <div
            key={index}
            className="flex flex-row justify-between border-b-[1px] border-[#454545] pt-6 pb-4"
          >
            <span className="text-[#8A8A8A] text-md font-semibold">
              {data.From}
            </span>
            <span className="text-[#8A8A8A] text-md font-semibold">
              {data.To}
            </span>
            <span className="text-[#8A8A8A] text-md font-semibold">
              {data.Amount}
            </span>
            <span className="text-[#8A8A8A] text-md font-semibold">
              {data.Type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionRecord;
