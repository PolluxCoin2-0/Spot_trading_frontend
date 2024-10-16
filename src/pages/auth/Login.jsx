import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setNetwork, setWalletAddress } from "../../redux/slice";

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.address);

  // connect wallet function
  async function getPolinkweb() {
    if (walletAddress) {
      return toast.error("Wallet is already connected");
    }

    var obj = setInterval(async () => {
      if (window.pox) {
        clearInterval(obj);
        const detailsData = JSON.stringify(await window.pox.getDetails());
        const parsedDetailsObject = JSON.parse(detailsData);
        console.log(parsedDetailsObject);
        dispatch(setWalletAddress(parsedDetailsObject[1].data?.wallet_address));
        dispatch(setNetwork(parsedDetailsObject[1].data?.Network));
        navigate("/herosection");
      }
    }, 1000);
  }

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
            onClick={getPolinkweb}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
