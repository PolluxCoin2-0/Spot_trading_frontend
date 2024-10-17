import polluxWeb from "polluxweb";
import { useState } from "react";
import { toast } from "react-toastify";
const SPOT_ADDRESS = import.meta.env.VITE_Spot;

const Register = () => {
  const [myAddress, setMyAddress] = useState("");
  const [referralAddress, setReferralAddress] = useState("");

  const PolluxWeb = new polluxWeb({
    fullHost: "https://testnet-fullnode.poxscan.io/",
   //  privateKey: "9076D182AE07696D55F34FED3AAE64BFA079E2CC20CE5E3B7582367C5E0D8572"
  });

 const handleRegister = async()=>{
  // Both feilds are not empty
  if(!myAddress || !referralAddress){
  toast.error("Enter values in both fields.");
  return;
  }

  console.log("spot",SPOT_ADDRESS)

     const address =await PolluxWeb.contract().at(SPOT_ADDRESS);
     console.log({address})

  // Check entered wallet address is already registered or not
  const isMyAddressRegistered = address.checkUser(myAddress);
  if(isMyAddressRegistered){
    toast.error("Entered Wallet Address is already registered!");
    return;
  }

  // Check entered referral address is registred or not
  const isReferralAddressRegistered = address.checkUser(referralAddress);
  if(!isReferralAddressRegistered){
    toast.error("Entered Referral Address is not registered!");
    return;
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
            //   onClick={!myWallet && handleWalletAddress}
            onChange={(e) => setMyAddress(e.target.value)}
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
            onClick={handleRegister}
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
