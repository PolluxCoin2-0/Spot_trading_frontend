import polluxWeb from "polluxweb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shortenString } from "../../utils/shortenString";
const SPOT_ADDRESS = import.meta.env.VITE_Spot;

const TransactionRecord = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const dataArray = useSelector((state) => state?.wallet?.dataObject);

  const PolluxWeb = new polluxWeb({
    fullHost: "https://testnet-fullnode.poxscan.io",
    privateKey:
      "C23F1733C3B35A7A236C7FB2D7EA051D57302228F92F26A7B5E01F0361C3A75C",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your async logic here
        const address = await PolluxWeb.contract().at(SPOT_ADDRESS);
        const transactionLength = await address
          .getUserTransactionsLength(
            PolluxWeb.address.fromHex(dataArray?.[0]?.[1])
          )
          .call();

        const length = Number(transactionLength?._hex);

        const transactionList = [];
        const addr = PolluxWeb.address.fromHex(dataArray?.[0]?.[1]);

        // Loop through each transaction starting from the last index
        for (let i = 0; i < length; i++) {
          try {
            const transaction = await address.Transactions(addr, i).call();
            // Extract relevant details and format them
            const formattedTransaction = {
              From: PolluxWeb.address.fromHex(transaction?.from),
              To: PolluxWeb.address.fromHex(transaction?.to),
              Amount: Number(transaction?.amount?._hex) / Math.pow(10, 18),
              Type: transaction?._type,
            };

            // Push the formatted transaction to the list
            transactionList.push(formattedTransaction);
          } catch (error) {
            console.log(error);
          }
        }

        // Update state with the fetched transactions
        setTransactionsList(transactionList);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className="text-[#FFCF56] text-center text-2xl md:text-4xl font-bold pt-10 pb-10">
        Transactions Record
      </p>

      {/* Table */}
      <div className="px-6 md:px-8 lg:px-16 2xl:px-24 pb-20">
        <div className="flex flex-row justify-between border-b-[1px] border-[#454545] pb-2 w-full">
          <span className="text-white text-sm md:text-lg font-bold w-[30%]">
            FROM
          </span>
          <span className="text-white text-sm md:text-lg font-bold w-[30%]">
            TO
          </span>
          <span className="text-white text-sm md:text-lg font-bold w-[20%] ">
            AMOUNT
          </span>
          <span className="text-white text-sm md:text-lg font-bold w-[20%] text-end">
            TYPE
          </span>
        </div>

        {transactionsList.map((data, index) => (
          <div
            key={index}
            className="flex flex-row justify-between border-b-[1px] border-[#454545] pt-6 pb-4 w-full"
          >
            <span className="text-[#8A8A8A] text-md font-semibold w-[30%]">
              {/* Shorten the address for mobile screens, show full address on larger screens */}
              <span className="block md:hidden">
                {shortenString(data.From, 3)}
              </span>
              <span className="hidden sm:block">{data.From}</span>
            </span>
            <span className="text-[#8A8A8A] text-md font-semibold w-[30%]">
              {/* Shorten the address for mobile screens, show full address on larger screens */}
              <span className="block sm:hidden">
                {shortenString(data.To, 3)}
              </span>
              <span className="hidden sm:block">{data.To}</span>
            </span>
            <span className="text-[#8A8A8A] text-md font-semibold w-[20%]">
              {data.Amount}
            </span>
            <span className="text-[#8A8A8A] text-md font-semibold w-[20%] text-end">
              {data.Type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionRecord;
