import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "",
    Network: "",
    login: false,
    signup: false,
    newPassword: false,
    forgotPassword : false,
    dataObject: [],
    
  },
  reducers: {
    setWalletAddress: (state, action) => {
      state.address = action.payload;
    },
   setDataObject: (state, action) => {
      // Replace the dataObject array with the new payload
      state.dataObject = [action.payload];
    },
    setNetwork: (state, action) => {
      state.Network = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setSignup: (state, action) => {
      state.signup = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setForgotPassword: (state, action) => {
      state.forgotPassword = action.payload;
    },

    
  },
});

export const { setWalletAddress, setNetwork, setLogin, setSignup, setNewPassword, setForgotPassword, setRegister,setDataObject } =
  walletSlice.actions;
export default walletSlice.reducer;
