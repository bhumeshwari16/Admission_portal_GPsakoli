import React from "react";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

function CapRound() {
  return (
    <div>
      <Header /> {/* Include the Header */}
      <div className="cap-round-container" id="cap-round">
        <h2 className="cap-round-title">CAP Round Admission Process</h2>
        <p className="cap-round-text">
          The **Centralized Admission Process (CAP)** is an admission procedure for professional courses where students are allotted seats based on merit and reservation criteria.
        </p>

        <div className="cap-steps">
          <h3>Steps in CAP Round</h3>
          <ul>
            <li><strong>Online Registration:</strong> Fill out the online application on the official website.</li>
            <li><strong>Document Verification:</strong> Submit required documents for verification.</li>
            <li><strong>Merit List Announcement:</strong> The merit list is published based on eligibility.</li>
            <li><strong>Choice Filling:</strong> Select preferred colleges and courses.</li>
            <li><strong>Seat Allotment:</strong> Seats are allotted based on merit and preferences.</li>
            <li><strong>Acceptance & Reporting:</strong> Confirm the allotted seat and report to the institute.</li>
          </ul>
        </div>

        <div className="cap-important-info">
          <h3>Important Information</h3>
          <ul>
            <li>CAP rounds are conducted online through the **official admission portal**.</li>
            <li>Students must carefully check the **eligibility criteria** before applying.</li>
            <li>Documents like **marksheets, caste certificates (if applicable), domicile certificate**, etc., are required.</li>
            <li>Students should adhere to the **given deadlines** to avoid cancellation of admission.</li>
          </ul>
        </div>

        <div className="cap-support">
          <h3>Support & Assistance</h3>
          <p>If you face any difficulties during the CAP round, you can contact the **admission cell** for guidance.</p>
          <ul>
            <li>Helpdesk Number: +91-9876543210</li>
            <li>Email Support: capsupport@college.com</li>
            <li>Physical Help Center Available on Campus</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Other Components */}
        <Footer />
      </div>

      <style>{`
        .cap-round-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 40px;
          background-color: #e3f2fd; /* Light blue background */
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.7;
        }

        .cap-round-title {
          font-size: 2.8em;
          color: #1976d2; /* Primary blue color */
          margin-bottom: 30px;
          text-align: center;
          border-bottom: 3px solid #1976d2;
          padding-bottom: 10px;
        }

        .cap-round-text {
          font-size: 1.1em;
          margin-bottom: 30px;
          text-align: justify;
          color: #555;
        }

        .cap-steps,
        .cap-important-info,
        .cap-support {
          margin-bottom: 40px;
          padding: 25px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border-left: 5px solid #1976d2;
        }

        h3 {
          font-size: 1.6em;
          color: #1976d2;
          margin-top: 0;
          margin-bottom: 20px;
          border-bottom: 2px solid #1976d2;
          padding-bottom: 8px;
        }

        ul {
          list-style: disc;
          padding-left: 30px;
          margin-bottom: 20px;
        }

        ul li {
          font-size: 1.05em;
          color: #555;
          margin-bottom: 10px;
        }

        ul li strong {
          font-weight: bold;
          color: #333;
        }

        p {
          margin-bottom: 15px;
          color: #555;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .cap-round-container {
            margin: 20px auto;
            padding: 20px;
          }

          .cap-round-title {
            font-size: 2.2em;
            margin-bottom: 20px;
          }

          .cap-round-text {
            font-size: 1em;
          }

          .cap-steps,
          .cap-important-info,
          .cap-support {
            padding: 15px;
            margin-bottom: 30px;
          }

          h3 {
            font-size: 1.4em;
            margin-bottom: 15px;
          }

          ul {
            padding-left: 20px;
          }

          ul li {
            font-size: 0.95em;
            margin-bottom: 8px;
          }
        }

        /* Stylish Effects */
        .cap-round-container:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease-in-out;
        }

        h3 {
          transition: color 0.3s ease;
        }

        h3:hover {
          color: #0d47a1; /* Darker blue on hover */
        }

        ul li:hover {
          background-color: #e0f7fa;
          padding-left: 5px;
          transition: background-color 0.3s ease, padding-left 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default CapRound;