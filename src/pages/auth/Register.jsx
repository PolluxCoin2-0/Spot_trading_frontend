import polluxWeb from "polluxweb";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { encodeParams } from "../../utils/approvalFunction";
import { getPolinkweb } from "../../utils/connectWallet";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataObject } from "../../redux/slice";

const SPOT_ADDRESS = import.meta.env.VITE_Spot;
const USDX_ADDRESS = import.meta.env.VITE_Usdx;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [myAddress, setMyAddress] = useState("");
  const [referralAddress, setReferralAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const referralAddressFromApp = location.state?.referralAddress;

  useEffect(()=>{
    if(referralAddressFromApp.length>0){
      setReferralAddress(referralAddressFromApp);
      toast.success("Referral Code Applied Successfully");
    }
  },[])

  const handleWalletAddress = async () => {
    if(loading){
      return;
    }

    setLoading(true);
    const walletAddress = await getPolinkweb();
    if (walletAddress) {
      setMyAddress(walletAddress);
      setLoading(false);
    }
  };

  const PolluxWeb = new polluxWeb({
    fullHost: "https://testnet-fullnode.poxscan.io",
    privateKey:
      "C23F1733C3B35A7A236C7FB2D7EA051D57302228F92F26A7B5E01F0361C3A75C",
  });

   const handleRegister = async () => {
     try {
    // Both feilds are not empty
     if (!myAddress || !referralAddress) {
       toast.error("Enter values in both fields.");
       return;
     }

    const address = await PolluxWeb.contract().at(SPOT_ADDRESS);
    const isMyAddressRegistered = await address.user(myAddress).call();
   if (
     isMyAddressRegistered.userAddress !=
      "370000000000000000000000000000000000000000"
    ) {
      toast.error("user is already registered");
      return;
  }

     // Check entered referral address is registred or not
    const isReferralAddressRegistered = await address
      .user(referralAddress)
      .call();
  if (
     !isReferralAddressRegistered.userAddress ===
     "370000000000000000000000000000000000000000"
    ) {
      toast.error("Entered Referral Address is not registered!");
        return;
      }

      const approvalRawData = await rawTxnApprove(SPOT_ADDRESS);
    const rawD = await rawDatApprove(approvalRawData);
      if (window.pox) {
      const signedData1 = await window.pox.signdata(rawD);
      console.log({ signedData1 });
      if (signedData1[0]) {
        let a = JSON.parse(signedData1[1]);
       const broadcast1 = await PolluxWeb.trx.sendRawTransaction(a);
      toast.success("Approve Txn Done...!");
     console.log({ broadcast1 });
    } else {
     toast.error("error in data");
   }
   } else {
     toast.error("Download Polink Extension");
     return;
   }
   const t = await rawTxnApprove(referralAddress);
    const rawData = await rawDataRegister(t);
       if (window.pox) {
     const signedData2 = await window.pox.signdata(rawData);
     console.log({ signedData2 });
     if (signedData2[0]) {
       let a = JSON.parse(signedData2[1]);
       await PolluxWeb.trx.sendRawTransaction(a);
      toast.success("Registration Done...!");
       dispatch(setDataObject(isMyAddressRegistered));
     navigate("/heroSection");
   } else {
     toast.error("error in data");
     }
  } else {
      toast.error("Download Polink Extension");
     return;
   }
   } catch (error) {
     console.log(error);
   }
  };

  const rawDatApprove = async (params) => {
    try {
      // const hexRefer = PolluxWeb.address.toHex(refer);
      const dat = await axios.post(
        "https://testnet-fullnode.poxscan.io/wallet/triggersmartcontract",
        {
          owner_address: myAddress,
          contract_address: USDX_ADDRESS,
          function_selector: "approve(address,uint256)",
          parameter: params,
          fee_limit: 1000000000,
          call_value: 0,
          visible: true,
        }
      );
      return dat.data.transaction;
    } catch (error) {
      toast.error(error.message);
    }
  };
  const rawDataRegister = async (params) => {
    try {
      // const hexRefer = PolluxWeb.address.toHex(refer);
      // console.log({ myAddress, SPOT_ADDRESS, hexRefer });

      const dat = await axios.post(
        "https://testnet-fullnode.poxscan.io/wallet/triggersmartcontract",
        {
          owner_address: myAddress,
          contract_address: SPOT_ADDRESS,
          function_selector: "Register(address,uint256)",
          parameter: params,
          fee_limit: 10000000000,
          call_value: 0,
          visible: true,
        }
      );
      return dat.data.transaction;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  const rawTxnApprove = async (addr) => {
    let inputs = [
      { type: "address", value: PolluxWeb.address.toHex(addr) },
      { type: "uint256", value: "30000000000000000000" },
    ];
    let parameters = await encodeParams(inputs);
    if (parameters) {
      console.log(parameters);

      return parameters;
    } else {
      toast.error("Error in approval");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div
        className="border border-[#39393C] p-6 sm:p-8 rounded-2xl text-center space-y-12 max-w-sm sm:max-w-md w-full bg-[#000000]"
        style={{
          boxShadow: `
              0 0px 5px rgba(255, 255, 255, 0.3)
            `,
        }}
      >
        <div className="space-y-2 sm:space-y-2">
          <p className="text-white text-2xl sm:text-xl font-semibold pt-6">
            Register to Spot Trading Dashboard
          </p>
          <p className="text-[#A6B1C5] text-md sm:text-base pt-2">
            To reach the dashboard connect your wallet first!
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="My Wallet address"
            value={myAddress}
            onClick={!myAddress && handleWalletAddress}
            // onChange={(e) => setMyAddress(e.target.value)}
            className="w-full px-4 py-3 text-white bg-black border border-[#39393C] rounded-full 
              focus:outline-none focus:ring-1 focus:ring-[#9b9b9b] focus:border-transparent transition-all shadow-inner hover:shadow-lg placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Referral Wallet address"
            value={referralAddress}
            onChange={(e) => setReferralAddress(e.target.value)}
            className="w-full px-4 py-3 text-white bg-black border border-[#39393C] rounded-full 
              focus:outline-none focus:ring-1 focus:ring-[#9b9b9b] focus:border-transparent transition-all shadow-inner hover:shadow-lg placeholder-gray-400"
          />

          <button
            // onClick={handleRegister}
            type="submit"
            className="whitespace-nowrap bg-[linear-gradient(to_right,#FFE27A,#FFBA57,#98DB7C,#8BCAFF)] text-black font-bold py-3 px-4 sm:px-6 
            rounded-full shadow-lg hover:shadow-xl transition-all w-full"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
