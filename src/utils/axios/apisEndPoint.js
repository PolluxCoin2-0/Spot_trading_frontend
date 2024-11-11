const API_ENDPOINTS = {
    auth: {
      login: "/login",
      register: "/register",
    },

    user: {
        getTransactionDetails: "/getTxns",
        getWithdraw: "/reqWithdraw",
        getSlot: "/getSlot",
        getReferStatus: "/checkRefer",
        verifyWalletAddress :"/validateAddress",
        getMatrixRecord :"/getNodes",
      },
   
  };
  
  export default API_ENDPOINTS;
  