import polluxWeb from "polluxweb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shortenString } from "../../utils/shortenString";
import Pagination from "../../component/Pagination";
import { transactionApi } from "../../utils/axios/apisFunction";

const SPOT_ADDRESS = import.meta.env.VITE_Spot;

const TransactionRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataArray = useSelector((state) => state?.wallet?.dataObject);

  const itemsPerPage = 10;

  const PolluxWeb = new polluxWeb({
    fullHost: "https://testnet-fullnode.poxscan.io",
    privateKey:
      "C23F1733C3B35A7A236C7FB2D7EA051D57302228F92F26A7B5E01F0361C3A75C",
  });

  
  // useEffect(() => {
  //   const fetchD
  //   try {
  //       const transactionRecord = await transactionApi(userAddress, page, pageLimit);

  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const address = await PolluxWeb.contract().at(SPOT_ADDRESS);
        const transactionLength = await address
          .getUserTransactionsLength(
            PolluxWeb.address.fromHex(dataArray?.[0]?.[1])
          )
          .call();

        const length = Number(transactionLength?._hex);

        const transactionList = [];
        const addr = PolluxWeb.address.fromHex(dataArray?.[0]?.[1]);

        for (let i = 0; i < length; i++) {
          try {
            const transaction = await address.Transactions(addr, i).call();
            const formattedTransaction = {
              From: PolluxWeb.address.fromHex(transaction?.from),
              To: PolluxWeb.address.fromHex(transaction?.to),
              Amount: Number(transaction?.amount?._hex) / Math.pow(10, 18),
              Type: transaction?._type,
            };
            transactionList.push(formattedTransaction);
          } catch (error) {
            console.log(error);
          }
        }

        setTransactionsList(transactionList);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginatedData = transactionsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-black min-h-screen pt-12">
      <p className="text-[#FFCF56] text-center text-2xl md:text-4xl font-bold pt-10 pb-10">
        Transactions Record
      </p>

      {isLoading ? (
        <div role="status" className="flex justify-center">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : transactionsList.length > 0 ? (
        <div className="px-6 md:px-8 lg:px-16 2xl:px-24 pb-20">
          <div className="flex flex-row justify-between border-b-[1px] border-[#454545] pb-2 w-full">
            <span className="text-white text-sm md:text-lg font-bold w-[30%]">
              FROM
            </span>
            <span className="text-white text-sm md:text-lg font-bold w-[30%]">
              TO
            </span>
            <span className="text-white text-sm md:text-lg font-bold w-[20%]">
              AMOUNT
            </span>
            <span className="text-white text-sm md:text-lg font-bold w-[20%] text-end">
              TYPE
            </span>
          </div>

          {transactionsList &&
            paginatedData.map((data, index) => (
              <div
                key={index}
                className="flex flex-row justify-between border-b-[1px] border-[#454545] pt-6 pb-4 w-full"
              >
                <span className="text-[#8A8A8A] text-md font-semibold w-[30%]">
                  <span className="block md:hidden">
                    {shortenString(data.From, 3)}
                  </span>
                  <span className="hidden md:block">{data.From}</span>
                </span>
                <span className="text-[#8A8A8A] text-md font-semibold w-[30%]">
                  <span className="block md:hidden">
                    {shortenString(data.To, 3)}
                  </span>
                  <span className="hidden md:block">{data.To}</span>
                </span>
                <span className="text-[#8A8A8A] text-md font-semibold w-[20%]">
                  {data.Amount}
                </span>
                <span className="text-[#8A8A8A] text-md font-semibold w-[20%] text-end">
                  {data.Type}
                </span>
              </div>
            ))}

          <Pagination
            totalRecords={transactionsList.length}
            setPageNo={handlePageChange}
          />
        </div>
      ) : (
        <p className="text-center  text-xl text-white  font-bold">
          No Data Found
        </p>
      )}


      
    </div>
  );
};

export default TransactionRecord;
// const dataArray = useSelector((state) => state?.wallet?.dataObject);
// let dataArray = localStorage.getItem("data");
// dataArray = JSON.parse(dataArray);
// const [timeLeft, setTimeLeft] = useState(0);
// const [originalTimestamp, setOriginalTimestamp] = useState(null);

// useEffect(() => {
  // Check if dataArray is loaded and contains the timestamp
//   if (dataArray && dataArray.length > 0 && dataArray?.[0]?.[6]) {
//     const timestampHex = dataArray?.[0]?.[6];
//     console.log({ ss: dataArray?.[0]?.[6] });

//     const parsedTimestamp = timestampHex ? Number(timestampHex, 16) : 0;
//     setOriginalTimestamp(parsedTimestamp);
//   }
// }, [dataArray]); // Trigger this effect when dataArray updates

