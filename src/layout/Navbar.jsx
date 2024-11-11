import logo from "../assets/SpotLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject } from "../redux/slice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataArray = useSelector((state) => state?.wallet?.dataObject);

  // Function to handle sign out
  const handleSignOut = () => {
    dispatch(setDataObject()); // Clear wallet data using dispatch
    navigate("/");
    toast.success("Signed out successfully");
  };

  return (
    <div className="bg-[#151515] flex flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 2xl:px-24 py-4">
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="w-20 md:w-24" />
      </div>

      <div className="flex flex-row space-x-4 sm:space-x-6 lg:space-x-8 items-center">
        <Link to="/record">
          <button
            type="button"
            className="text-white font-semibold text-sm sm:text-lg lg:text-2xl"
          >
            Transactions
          </button>
        </Link>
      
        <div>
          <button
            type="button"
            className="whitespace-nowrap bg-[linear-gradient(to_right,#FFE27A,#FFBA57,#98DB7C,#8BCAFF)] text-black font-bold py-2 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full
              shadow-lg hover:shadow-xl transition-all w-full text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={dataArray ? handleSignOut : null}
          >
            {dataArray ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
