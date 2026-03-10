import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Navbar from './Component/Navbar';
import LandingPage from './Component/LandingPage';
import ApplyForm from './Component/ApplyForm';
import Login from './Component/Login';
import Signup from './Component/Signup';
import VerifyOtp from './Component/Verifyotp';
import SendOtp from './Component/SendOtp';

// Admin Imports
import AdminLayout from "./pages/AdminDashboard/AdminLayout";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import CostomerRecords from './pages/AdminDashboard/CustomerRecords';
import AdminEnquirie from './pages/AdminDashboard/Enquirie';
import Profile from './pages/AdminDashboard/Profile';
import LoanType from './pages/AdminDashboard/LoanType';
import Disbursement from './pages/AdminDashboard/Disbursement';
import LoanApproval from './pages/AdminDashboard/LoanApproval';
import LoanProcessing from './pages/AdminDashboard/LoanProcessing';
import Documents from './pages/AdminDashboard/Documents';

function App() {
  return (
    <Routes>

      {/* User Layout Route */}
      <Route path="/" element={<Navbar />}>
        <Route index element={<LandingPage />} />
        <Route path="apply" element={<ApplyForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="sendotp" element={<SendOtp />} />
        <Route path="verifyotp" element={<VerifyOtp />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="customer" element={<CostomerRecords />} />
        <Route path="enquiry" element={<AdminEnquirie />} />
        <Route path="loantype" element={<LoanType />} />
        <Route path='distribute' element={<Disbursement/>}/>
        <Route path='doqument' element={<Documents/>}/>
        <Route path='loanapprove' element={<LoanApproval/>}/>
        <Route path='loanprocess' element={<LoanProcessing/>}/>
        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default App;