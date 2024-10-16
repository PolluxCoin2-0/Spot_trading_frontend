// import polluxWeb from "polluxweb";

const Register = () => {
  // const PolluxWeb = new polluxWeb({
  //   fullHost: "https://testnet-fullnode.poxscan.io/",

  // });

  // const address =await PolluxWeb.contract().at(
  //   "PApFeUXaX7jjHu3RQcwvgzy1tCwt3G9Q42"
  // );

  // const handleRegister = async()=>{

  // }
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
            //   value={myWallet}
            //   onClick={!myWallet && handleWalletAddress}
            // onChange={(e) => setMyWallet(e.target.value)}
            className="w-full px-4 py-3 text-white bg-black border border-[#39393C] rounded-full 
              focus:outline-none focus:ring-1 focus:ring-[#9b9b9b] focus:border-transparent transition-all shadow-inner hover:shadow-lg placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Referral Wallet address"
            //   value={referralWallet}
            // onChange={(e) => setReferralWallet(e.target.value)}
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
