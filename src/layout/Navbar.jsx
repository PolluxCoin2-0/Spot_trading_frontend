import logo from "../assets/SpotLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject } from "../redux/slice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataArray = useSelector((state) => state?.wallet?.dataObject);

  // Function to handle sign out
  const handleSignOut = () => {
    console.log("ujhuhuhu")
    dispatch(setDataObject()); // Clear wallet data using dispatch
    navigate("/")
    toast.success("Signed out successfully");
  };

  return (
    <div className="bg-[#151515] flex flex-row justify-between items-center px-6 md:px-8 lg:px-16 2xl:px-24 p-4">
      <img src={logo} alt="" className="" />

        <div>
          <button
            type="button"
            className="whitespace-nowrap bg-[linear-gradient(to_right,#FFE27A,#FFBA57,#98DB7C,#8BCAFF)] text-black font-bold py-3  px-8 md:px-6 rounded-full
             shadow-lg hover:shadow-xl transition-all w-full "
            onClick={dataArray ? handleSignOut : null}
          >
            {dataArray ? "Logout" : "Login"}
          </button>
        </div>
    </div>
  );
};

export default Navbar;
