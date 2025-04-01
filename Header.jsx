import { Link } from "react-router-dom";
import "./Header.css"; // Add CSS for styling

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <Link to="/">
          <img src="l1.jpeg" alt="Logo" className="navbar-logo" />
        </Link>
        <h1 style={{ color: "white", marginLeft: "10px" }}>Government Polytechnic Sakoli </h1>
      </div>

      <div className="ml-auto">
        {/* Apply Now Dropdown */}
        <div className="dropdown">
          <button className="btn btn-primary">Apply Now</button>
          <div className="dropdown-content">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="dropdown">
          <button className="btn btn-primary">Department</button>
          <div className="dropdown-content">
            <Link to="/Civil">Civil</Link>
            <Link to="/Mechanical">Mechanical</Link>
            <Link to="/Electronics">Electronic</Link>
            <Link to="/Electrical">Electrical</Link>
            <Link to="/Computer">Computer Dept</Link>
          </div>
        </div>

        {/* Student Section */}
        <div className="dropdown">
          <button className="btn btn-primary">Student Section</button>
          <div className="dropdown-content">
            <Link to="/Admissionfees">Admission Fees</Link>
            <Link to="/Student">Important Introduction For Student</Link>
            <Link to="/Cap">CAP round</Link>
          </div>
        </div>

        {/* Important Links */}
        <div className="dropdown">
          <button className="btn btn-primary">Important Link</button>
          <div className="dropdown-content">
            <a href="https://msbte.ac.in/" target="_blank" rel="noopener noreferrer">MSBTE</a>
            <a href="https://www.gpsakoli.ac.in/" target="_blank" rel="noopener noreferrer">GPSAKOLI</a>
          </div>
        </div>

        {/* Contact Now Button */}
        <Link to="/Contact" className="btn btn-primary ml-2">Contact Now</Link>
      </div>
    </nav>
  );
}

export default Header;
