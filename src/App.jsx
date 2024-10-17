import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import HeroSection from "../src/pages/Home/HeroSection";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
        <Navbar/>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop={true}
        pauseOnFocusLoss
        toastClassName="custom-toast"
      />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/herosection" element={<HeroSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
