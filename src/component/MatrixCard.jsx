const MatrixCard = ({matrixRecord}) => {
  console.log(`Card ${matrixRecord}`)
  return (
    // <div className="w-full md:w-[50%]  bg-[#151515]  rounded-3xl shadow-inner shadow-[#464545]">

    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between rounded-2xl">
      {matrixRecord.length > 0 ? (
        matrixRecord.map((item, index) => (
          <div
            key={item._id}
            className={`w-full md:w-[50%]  shadow-lg p-6 transition duration-300 ${
              index === 0
                ? "border-r-[1px] border-gray-500 border-opacity-35 rounded-2xl md:rounded-l-2xl md:rounded-r-none bg-blue-600"
                : "rounded-2xl md:rounded-l-none md:rounded-r-2xl bg-cyan-600"
            }`}
          >
            <h2 className="text-lg font-semibold text-white">
              Slot {item.level}
            </h2>
            <p className="text-white font-semibold text-sm">
              User ID:{" "}
              {item?.user
                ? `${item.user.substring(0, 5)}...${item.user.slice(-4)}`
                : "Loading..."}
            </p>

            <div className="mt-4">
              <p
                className={`font-bold text-base py-1 rounded ${
                  item.isSlotFilled ? " text-green-600" : " text-red-600"
                }`}
              >
                {item.isSlotFilled ? "Slot Filled" : "Slot Open"}
              </p>
            </div>
            <p className="mt-4 text-white font-semibold text-sm">
              Parent: {item.parent}
            </p>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <span
                  className={`font-semibold rounded-full h-16 w-16 flex items-center justify-center ${
                    item.left
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  1
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span
                  className={`font-semibold rounded-full h-16 w-16 flex items-center justify-center ${
                    item.right
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  2
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default MatrixCard;
