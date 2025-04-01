import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function StudentLogin() {
  const [formData, setFormData] = useState({ denNumber: "", email: "", password: "" });
  const [userName, setUserName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUserName(data.name);
        setShowSuccess(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleProceed = () => {
    setShowSuccess(false);
    navigate("/NewAdmissionForm");
  };

  return (
    <div>
      <Header />
      <div className="stdlog-container">
        <div className="stdlog-box">
          <h2 className="stdlog-title">Student Login</h2>
          <form className="stdlog-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="denNumber"
              placeholder="DEN Number"
              className="stdlog-input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="stdlog-input"
              onChange={handleChange}
              required
            />
            <div className="stdlog-password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="stdlog-input"
                onChange={handleChange}
                required
              />
              <span
                className="stdlog-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
            <button type="submit" className="stdlog-button">Login</button>
          </form>

          {/* Signup Link */}
          <p className="signup-link">
            New User? <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>

        {showSuccess && (
          <div className="stdlog-success-box">
            <p>Login Success 🎉 Welcome, <strong>{userName}</strong>!</p>
            <button className="stdlog-proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        )}
      </div>
      <Footer />

      {/* Internal CSS for full responsiveness and stylish design */}
      <style>{`
        /* Reset and Box Sizing */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f8f9fa; /* Light background */
          color: #333;
          line-height: 1.6;
        }

        .stdlog-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh; /* Adjust as needed */
          padding: 20px;
          background-color: #f8f9fa; /* White background */
        }

        .stdlog-box {
          background-color: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          width: 95%; /* Adjust width for responsiveness */
          max-width: 400px; /* Maximum width */
          text-align: center;
          animation: fadeIn 0.5s ease-in-out;
        }

        .stdlog-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #343a40; /* Darker text */
        }

        .stdlog-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .stdlog-input {
          padding: 14px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        .stdlog-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .stdlog-password-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .stdlog-password-toggle {
          position: absolute;
          right: 12px;
          cursor: pointer;
          font-size: 20px;
          color: #6c757d;
        }

        .stdlog-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .stdlog-button:hover {
          background-color: #0056b3;
        }

        .signup-link {
          margin-top: 20px;
          font-size: 16px;
          color: #6c757d;
        }

        .signup-link span {
          color: #007bff;
          cursor: pointer;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .signup-link span:hover {
          color: #0056b3;
          text-decoration: underline;
        }

        .stdlog-success-box {
          background-color: #d1e7dd;
          color: #155724;
          padding: 15px;
          margin-top: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease-in-out;
        }

        .stdlog-proceed-button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 12px 20px;
          margin-top: 15px;
          cursor: pointer;
          border-radius: 8px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .stdlog-proceed-button:hover {
          background-color: #1e7e34;
        }

        /* Responsive Styles */
        @media (max-width: 576px) {
          .stdlog-box {
            padding: 25px;
          }

          .stdlog-title {
            font-size: 24px;
          }

          .stdlog-input {
            padding: 12px;
            font-size: 15px;
          }

          .stdlog-button {
            font-size: 16px;
          }

          .signup-link {
            font-size: 15px;
          }
        }

        /* Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default StudentLogin;