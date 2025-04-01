import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function StudentSignup() {
  const [formData, setFormData] = useState({ name: "", denNumber: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(`🎉 Signup Successful! Welcome, ${formData.name}!`);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="stdsignup-container">
        <div className="stdsignup-box">
          <h2 className="stdsignup-title">Student Signup</h2>
          <form className="stdsignup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="stdsignup-input"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="denNumber"
              placeholder="DEN Number"
              className="stdsignup-input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="stdsignup-input"
              onChange={handleChange}
              required
            />
            <div className="stdsignup-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="stdsignup-input"
                onChange={handleChange}
                required
              />
              <span 
                className="stdsignup-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
            <button type="submit" className="stdsignup-button">Signup</button>
          </form>
          <p className="stdsignup-login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
        {message && (
          <div className={`stdsignup-message-box ${isSuccess ? "success" : "error"}`}>
            <p>{message}</p>
          </div>
        )}
      </div>
      <Footer />

      <style>{`
        /* Reset and Box Sizing */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f8f9fa;
          color: #333;
          line-height: 1.6;
        }

        .stdsignup-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 20px;
          background-color: #f8f9fa;
        }

        .stdsignup-box {
          background-color: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          width: 95%;
          max-width: 400px;
          text-align: center;
          animation: fadeIn 0.5s ease-in-out;
        }

        .stdsignup-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #343a40;
        }

        .stdsignup-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .stdsignup-input {
          padding: 14px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          width: 100%;
        }

        .stdsignup-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .stdsignup-password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .stdsignup-toggle-password {
          position: absolute;
          right: 12px;
          font-size: 20px;
          color: #6c757d;
          user-select: none;
        }

        .stdsignup-button {
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

        .stdsignup-button:hover {
          background-color: #0056b3;
        }

        .stdsignup-login-link {
          margin-top: 20px;
          font-size: 16px;
          color: #6c757d;
        }

        .stdsignup-login-link a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .stdsignup-login-link a:hover {
          color: #0056b3;
          text-decoration: underline;
        }

        .stdsignup-message-box {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          font-size: 16px;
        }

        .stdsignup-message-box.success {
          background-color: #d1e7dd;
          color: #155724;
        }

        .stdsignup-message-box.error {
          background-color: #f8d7da;
          color: #721c24;
        }

        @media (max-width: 576px) {
          .stdsignup-box {
            padding: 25px;
          }

          .stdsignup-title {
            font-size: 24px;
          }

          .stdsignup-input {
            padding: 12px;
            font-size: 15px;
          }

          .stdsignup-button {
            font-size: 16px;
          }

          .stdsignup-login-link {
            font-size: 15px;
          }

          .stdsignup-message-box {
            font-size: 15px;
            padding: 12px;
          }
        }

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

export default StudentSignup;