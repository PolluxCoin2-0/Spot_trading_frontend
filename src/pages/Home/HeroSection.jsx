import { FaCopy } from "react-icons/fa6";
import usdxImg from "../../assets/usdx.png";
import LRImg from "../../assets/lrImg.png";
import CountdownTimer from "../../component/CountdownTimer";
import TransactionRecord from "./TransactionRecord";
import Navbar from "../../layout/Navbar";
import polluxWeb from "polluxweb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SPOT_ADDRESS = import.meta.env.VITE_Spot;
const REFERRAL_BASE_URL = import.meta.env.VITE_Referral_Link;

const HeroSection = () => {
  const dataArray = useSelector((state) => state?.wallet?.dataObject);
  console.log({dataArray} );

  const PolluxWeb = new polluxWeb({
    fullHost: "https://testnet-fullnode.poxscan.io",
    privateKey:
      "C23F1733C3B35A7A236C7FB2D7EA051D57302228F92F26A7B5E01F0361C3A75C",
  });

  const handleContractCopy = () => {
    const contractLink = `https://poxscan.io/address-account/${SPOT_ADDRESS}`;
    navigator.clipboard.writeText(contractLink);
    toast.success("Contract Link copied.");
  };

  const handleReferralCopy = (walletAddress) => {
    const referralLink = REFERRAL_BASE_URL + `/referral/${walletAddress}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral Link copied.");
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-black h-auto pt-12">
        {/* referral address and contract address */}
        <div className="px-6 md:px-8 lg:px-16 2xl:px-24 ">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 space-x-0 lg:space-x-8 xl:space-x-10 mb-8 ">
            <div className="bg-[#151515] flex items-center justify-between space-x-8 p-6 rounded-2xl w-full lg:w-[50%]  overflow-hidden">
              <p className="text-[#8A8A8A] font-medium truncate">
                Referral Link: {PolluxWeb.address.fromHex(dataArray?.[0]?.[1])}
               
              </p>
              <FaCopy
                color="white"
                size={24}
                className="cursor-pointer"
                onClick={() =>
                  handleReferralCopy(
                    PolluxWeb.address.fromHex(dataArray?.[0]?.[1])
                  )
                }
              />
            </div>

            <div className="bg-[#151515] flex items-center justify-between space-x-8 p-6 rounded-2xl w-full lg:w-[50%]  overflow-hidden">
              <p className="text-[#8A8A8A] font-medium truncate">
                Contract Address: {SPOT_ADDRESS}
                
              </p>
              <FaCopy
                onClick={handleContractCopy}
                color="white"
                size={24}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* l/R Address,available balance and claim balance */}
        <div className="px-6 md:px-8 lg:px-16 2xl:px-24">
        
          <div className=" flex flex-col lg:flex-row justify-between items-center space-x-0 lg:space-x-8 xl:space-x-10 w-full">
            <div className="w-full lg:w-[50%]">
          <p className="text-[#8A8A8A] pl-5 text-lg font-semibold pb-3 ">
            Left Right Address
          </p>
            <div className="bg-[#151515] flex items-center justify-between  p-6 rounded-2xl  shadow-inner shadow-[#464545]">
              <p className="text-white font-medium truncate text-xl ">
                **********************
              
              </p>
              {/* <img src={LRImg} alt="left-right-nodes" className="" /> */}
              <FaCopy
                color="white"
                size={24}
                className="cursor-pointer"
              
              />
            </div>
            </div>

            <div className="w-full lg:w-[50%] flex flex-row justify-between space-x-4 md:space-x-6 lg:space-x-8 mt-6 lg:mt-0 ">
               <div className="w-1/2">
              <p className="text-[#8A8A8A] pl-5 text-lg font-semibold pb-3 ">
               Available Balance
              </p> 
              <div className="bg-[#151515] flex items-center justify-between  p-6 rounded-2xl  shadow-inner shadow-[#464545]">
                <p className="text-white font-bold truncate text-2xl">
                  {dataArray?.[0]?.[14]?._hex
                    ? Number(dataArray?.[0]?.[14]?._hex)
                    : 0}
                  
                </p>
              </div>
               </div> 

               <div className="w-1/2">
               <p className="text-[#8A8A8A] pl-5 text-lg font-semibold pb-3 ">
               Claimed Balance
              </p> 
              <div className="bg-[#151515] flex items-center justify-between  p-6 rounded-2xl shadow-inner shadow-[#464545]">
                <p className="text-white font-bold truncate text-2xl">
                  {dataArray?.[0]?.[15]?._hex
                    ? Number(dataArray?.[0]?.[15]?._hex)
                    : 0}
                
                </p>
              </div>
              </div> 
            </div>
          </div>
        </div>

        {/* Matrix Details and Withdraw */}
        <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-6 lg:space-x-10 px-6 md:px-8 lg:px-16 2xl:px-24 mt-10 w-full">
          <div className="w-full md:w-[50%] bg-[#151515]  rounded-3xl shadow-inner shadow-[#464545]">
            <p className=" text-center text-white text-xl font-semibold bg-[#1a1919] rounded-tl-2xl rounded-tr-2xl pt-3 pb-3 shadow-inner shadow-[#464545]">
              MATRIX DETAILS
            </p>
            <div className=" p-8">
              <p className="text-[#8A8A8A] font-semibold text-xl  ">
                Matrix Details :{" "}
                {dataArray?.[0]?.[10]?._hex
                  ? Number(dataArray?.[0]?.[10]?._hex)
                  : 0}
              </p>
              {/* <p className="text-[#8A8A8A] font-semibold text-lg pt-4">
                Min $10 Max $200.....
              </p> */}
            </div>
          </div>

          <div className="w-full md:w-[50%] bg-[#151515]  rounded-3xl pb-8 shadow-inner shadow-[#464545] mt-6 md:mt-0">
            <p className=" text-center text-white text-xl font-semibold bg-[#1a1919] rounded-tl-2xl rounded-tr-2xl pt-2 pb-3 shadow-inner shadow-[#464545]">
              WITHDRAW
            </p>
            <div className="p-8 md:p-4 lg:p-8 flex flex-col md:flex-row justify-between space-x-0 md:space-x-3 lg:space-x-6 items-center w-full mt-4">
              <div className="w-full md:w-[40%] xl:w-[20%] flex flex-row items-center justify-center space-x-2 bg-[#1a1919] pt-1 pb-1 rounded-lg">
                <p>
                  <img src={usdxImg} alt="" className="" />
                </p>
                <p className="text-white font-bold text-xl ">USDX</p>
              </div>

              <div className="w-full md:w-[60%] xl:w-[70%] mt-6 md:mt-0">
                <button
                  // onClick={handleRegister}
                  type="submit"
                  className="whitespace-nowrap bg-[linear-gradient(to_right,#FFE27A,#FFBA57,#98DB7C,#8BCAFF)] text-black text-xl font-bold py-4 px-4 sm:px-6 
                             rounded-lg shadow-lg hover:shadow-xl transition-all w-full"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CountdownTimer  */}
        <div>
          <CountdownTimer />
        </div>

        <div className="px-6 md:px-8 lg:px-16 2xl:px-24 ">
          <p className="border-[1px] border-[#454545]"></p>
        </div>

        {/* Transaction Record */}
        <div>
          <TransactionRecord />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
