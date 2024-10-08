import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./pages/SignupForm";
import HomePage from "./pages/Homepage";
import InvoicePage from "./pages/InvoicePage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AboutPage from "./pages/About";
import PublicNavbar from "./components/PublicNavbar";
import Footer from "./components/Admin/Footer";
import SignInForm from "./pages/SignInForm";
import PrivateNavbar from "./components/PrivateNavbar";
import CreateInventory from "./pages/CreateInventry";
import Homepage from "../Templates/Home/Homepage";

const App = () => {
  // const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      {/* <PublicNavbar /> */}

      <Routes>
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/invoice" element={<InvoicePage />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/create-invoice" element={<CreateInventory />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
