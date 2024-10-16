import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject, setNetwork, setWalletAddress } from "../../redux/slice";
import polluxWeb from "polluxweb";
import { useState } from "react";
const SPOT_ADDRESS = import.meta.env.VITE_Spot;

const Login = () => {
   const [myAddress, setMyAddress] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();

  // Connect wallet function
async function getPolinkweb() {
  return new Promise((resolve, reject) => {
    const obj = setInterval(async () => {
      if (window.pox) {
        clearInterval(obj);
        try {
          const detailsData = JSON.stringify(await window.pox.getDetails());
          const parsedDetailsObject = JSON.parse(detailsData);
          resolve(parsedDetailsObject[1].data?.wallet_address);
        } catch (error) {
          reject("Failed to get wallet address");
        }
      }
    }, 100);
  });
}

const handleLogin = async () => {
  try {
    const walletAddress = await getPolinkweb(); // Ensure we have the wallet address
    if (!walletAddress) {
      toast.error("Failed to retrieve wallet address");
      return;
    }

    // console.log("Got wallet address", walletAddress);

    const PolluxWeb = new polluxWeb({
      fullHost: "https://testnet-fullnode.poxscan.io",
      privateKey:
        "C23F1733C3B35A7A236C7FB2D7EA051D57302228F92F26A7B5E01F0361C3A75C",
    });

    const address = await PolluxWeb.contract().at(SPOT_ADDRESS);
    const isMyAddressRegistered = await address.user(walletAddress).call();

    if (
      isMyAddressRegistered.userAddress ==
      "370000000000000000000000000000000000000000"
    ) {
      toast.error("User is not already registered");
      return;
    }
    // console.log({isMyAddressRegistered})
    // Dispatch data to the Redux store
    dispatch(setDataObject(isMyAddressRegistered));

    // Navigate to the hero section
    navigate("/herosection");
    
  } catch (error) {
    console.error("An error occurred:", error);
    toast.error("An error occurred during login");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div
        className="border border-[#39393C] p-8 sm:p-8 rounded-2xl text-center space-y-8 max-w-sm sm:max-w-md w-full bg-[#000000]"
        style={{
          boxShadow: `
              0 0px 5px rgba(255, 255, 255, 0.3)
            `,
        }}
      >
        <div className="space-y-2 sm:space-y-4">
          {/* <p className="text-white text-xl sm:text-2xl font-bold">Spot Trading</p> */}
          <p className="text-white text-2xl sm:text-xl font-bold">
            Welcome to Spot Trading Dashboard
          </p>
          <p className="text-[#A6B1C5] text-md sm:text-base">
            To reach the dashboard connect your wallet first!
          </p>
        </div>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <Link
            to="/register"
            className="border border-white text-white py-3 px-4 sm:px-6 font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all w-full md:w-1/2"
          >
            Register
          </Link>
          <button
            className="whitespace-nowrap bg-[linear-gradient(to_right,#FFE27A,#FFBA57,#98DB7C,#8BCAFF)] text-black font-bold py-3 px-4 sm:px-6 rounded-full
             shadow-lg hover:shadow-xl transition-all w-full md:w-1/2"
            onClick={handleLogin}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
