import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarTop from "./components/NavbarTop";
import Home from "./components/Home";
import LoanApplication from "./components/LoanApplication";
import LoanList from "./components/LoanList";
import RepayLoan from "./components/RepayLoan";
import LoginSignUp from "./components/LoginSignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import { useSelector } from "react-redux";

const App = () => {


  return (
    <BrowserRouter>
      <NavbarTop />

      <Routes>
        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route exact path="/loan/" element={<LoanApplication />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/all-loans" element={<LoanList />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/repay/:id" element={<RepayLoan />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route exact path="/admin/dashbord" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
