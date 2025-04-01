import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p >Welcome! to GPS <br></br> <br /> Let's make your future together</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">About Us</a></li>
            
            <li>  <Link to="/Adminlogin">Admin Dashboard</Link></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="#">Facebook</a> | 
          <a href="#">Twitter</a> | 
          <a href="#">Instagram</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: office.gpsakoli@dtemaharashtra.gov.in</p>
          <p>Phone: 07186-295112</p>
        </div>
      </div>
      <div className="footer-bottom">
      Copyright ©2025 All rights reserved | Government Polytechnic, Sakoli : BHUMESHWARI DOYE
      </div>
    </footer>
  );
};

export default Footer;
