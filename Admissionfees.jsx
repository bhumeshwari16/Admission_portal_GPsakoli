import React from "react";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

function AdmissionFees() {
  return (
    <div>
      <Header /> {/* Include the Header */}
      <div className="fees-container" id="fees-section">
        <h2 className="student-intro-title">Admission Fees Details</h2>
        <table className="fees-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Duration</th>
              <th>Fees (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Diploma in Civil Engineering</td>
              <td>3 Years</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>Diploma in Mechanical Engineering</td>
              <td>3 Years</td>
              <td>₹32,000</td>
            </tr>
            <tr>
              <td>Diploma in Electrical Engineering</td>
              <td>3 Years</td>
              <td>₹31,000</td>
            </tr>
            <tr>
              <td>Diploma in Electronics Engineering</td>
              <td>3 Years</td>
              <td>₹29,000</td>
            </tr>
            <tr>
              <td>Diploma in Computer Engineering</td>
              <td>3 Years</td>
              <td>₹33,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* Other Components */}
        <Footer />
      </div>

      <style>{`
        .fees-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 40px;
          background-color: #f8f8f8;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
          color: #333;
        }

        .student-intro-title {
          font-size: 2.5em;
          color: #007bff;
          margin-bottom: 30px;
          text-align: center;
          border-bottom: 3px solid #007bff;
          padding-bottom: 10px;
        }

        .fees-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          overflow: hidden; /* Hide border-radius overflow for proper styling */
        }

        .fees-table th,
        .fees-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        .fees-table thead {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }

        .fees-table tbody tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .fees-table tbody tr:hover {
          background-color: #e0f7fa;
          transition: background-color 0.3s ease-in-out;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .fees-container {
            margin: 20px auto;
            padding: 20px;
          }

          .student-intro-title {
            font-size: 2em;
            margin-bottom: 20px;
          }

          .fees-table th,
          .fees-table td {
            padding: 8px;
            font-size: 0.9em;
          }
        }

        /* Stylish Effects */
        .fees-container:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease-in-out;
        }

        .fees-table {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default AdmissionFees;