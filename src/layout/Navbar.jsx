import { Link } from "react-router-dom";
import logo from "../assets/SpotLogo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const walletAddress = useSelector((state) => state.wallet.address);
  return (
    <div className="bg-[#151515] flex flex-row justify-between items-center px-6 md:px-8 lg:px-16 2xl:px-24 p-4">
      <img src={logo} alt="" className="" />

      <Link to="/">
        <div>
          <button
            type="button"
            className="whitespace-nowrap bg-[linear-gradient(to_right,#FFE27A,#FFBA57,#98DB7C,#8BCAFF)] text-black font-bold py-3  px-8 md:px-6 rounded-full
             shadow-lg hover:shadow-xl transition-all w-full "
          >
            {walletAddress ? walletAddress : "Login"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
