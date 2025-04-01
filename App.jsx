import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Importing all components for the routes
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Civil from "./Civil";
import Electronics from "./Electronics";
import Computer from "./Computer";
import Electrical from "./Electrical";
import Mechanical from "./Mechanical";
import Student from "./Student";
import Cap from "./Cap";
import Admin from "./Admin";
import Adminlogin from "./Adminlogin";
import Adminsignup from "./Adminsignup";
import Contact from "./Contact";
import NewAdmissionForm from "./NewAdmissionForm";
import Header from "./Header";
import Footer from "./Footer";
import Admissionfees from "./Admissionfees";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Additional routes matching the imported components */}
        <Route path="/civil" element={<Civil />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/computer" element={<Computer />} />
        <Route path="/electrical" element={<Electrical />} />
        <Route path="/Mechanical" element={<Mechanical />} />
        <Route path="/student" element={<Student />} />
        <Route path="/cap" element={<Cap />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/NewAdmissionForm" element={<NewAdmissionForm />} />
        
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Header />} />
        <Route path="/Admissionfees" element={<Admissionfees />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/Adminsignup" element={<Adminsignup />} />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}



export default App;
