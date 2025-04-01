import React, { useState } from "react";
import Header from "./Header"; // Import Header
import Footer from "./Footer"; // Import Footer component

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    // You would typically send this data to a server here
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds for demo
  };

  return (
    <div>
      <Header /> {/* Use the Header component */}
      {/* Contact Form */}
      <div className="contact-container">
        <div className="contact-form-wrapper">
          <h2 className="contact-title">Contact Us</h2>
          {submitted ? (
            <div className="contact-success-message">Your message has been sent successfully!</div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name"><strong>Name</strong></label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message"><strong>Message</strong></label>
                <textarea
                  placeholder="Enter Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-button">Send Message</button>
            </form>
          )}
        </div>
      </div>
      <div>
        {/* Other Components */}
        <Footer />
      </div>

      <style>{`
        .contact-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh; /* Adjust as needed */
          padding: 20px;
          background-color: #f4f7f6;
        }

        .contact-form-wrapper {
          background-color: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 600px;
        }

        .contact-title {
          font-size: 2.5em;
          color: #34495e;
          margin-bottom: 30px;
          text-align: center;
          border-bottom: 3px solid #34495e;
          padding-bottom: 10px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: bold;
        }

        .form-control {
          width: 100%;
          padding: 15px;
          border: 1px solid #bdc3c7;
          border-radius: 8px;
          font-size: 1em;
          color: #34495e;
          transition: border-color 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
        }

        .contact-button {
          background-color: #3498db;
          color: white;
          padding: 15px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1.1em;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
        }

        .contact-button:hover {
          background-color: #2980b9;
        }

        .contact-success-message {
          background-color: #d4edda;
          color: #155724;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 1.1em;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-container {
            padding: 10px;
          }

          .contact-form-wrapper {
            padding: 30px;
          }

          .contact-title {
            font-size: 2em;
            margin-bottom: 20px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-control {
            padding: 12px;
            font-size: 0.95em;
          }

          .contact-button {
            padding: 12px 18px;
            font-size: 1em;
          }
        }

        /* Stylish Effects */
        .contact-form-wrapper {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .contact-button {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .contact-button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Contact;