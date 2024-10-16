import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import HeroSection from "../src/pages/Home/HeroSection";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Provider } from "react-redux";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to register if referral link detected
    if (location.pathname.startsWith("/referral/")) {
      const referralAddress = location.pathname.split("/")[2];
      navigate("/register", { state: { referralAddress } });
    }
  }, [location, navigate]);

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          newestOnTop={true}
          pauseOnFocusLoss
          toastClassName="custom-toast"
        />
        <Routes>
          <Route path="/herosection" element={<HeroSection />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      </PersistGate>
      </Provider>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
