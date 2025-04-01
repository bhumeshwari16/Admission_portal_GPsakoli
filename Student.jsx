import React from "react";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

function StudentIntro() {
  return (
    <div>
      <Header /> {/* Include the Header */}
      <div className="student-intro-container" id="student-intro">
        <h2 className="student-intro-title">Important Introduction for Students</h2>
        <p className="student-intro-text">
          Welcome to our institution! As a student, you are about to embark on a journey of knowledge, skill-building, and personal growth.
          Below are some key guidelines and important information to help you get started.
        </p>

        <div className="student-guidelines">
          <h3>General Guidelines</h3>
          <ul>
            <li>Attend all your classes regularly and be punctual.</li>
            <li>Respect your teachers, peers, and the institution's rules.</li>
            <li>Maintain a positive learning attitude and actively participate in discussions.</li>
            <li>Complete assignments and projects on time.</li>
            <li>Keep the campus clean and follow ethical practices.</li>
          </ul>
        </div>

        <div className="academic-info">
          <h3>Academic Information</h3>
          <p>Our institution follows a structured academic calendar. Here are some key academic guidelines:</p>
          <ul>
            <li>Semester exams are held at the end of each term.</li>
            <li>Assignments, practicals, and internal assessments are mandatory.</li>
            <li>Library facilities are available for research and study.</li>
            <li>Workshops and industrial visits are conducted for practical exposure.</li>
          </ul>
        </div>

        <div className="student-support">
          <h3>Student Support Services</h3>
          <p>We provide various support services to ensure a smooth educational journey:</p>
          <ul>
            <li>Career counseling and placement assistance.</li>
            <li>Extra coaching for academically weak students.</li>
            <li>Scholarship programs for eligible students.</li>
            <li>Technical and non-technical clubs for overall development.</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Other Components */}
        <Footer />
      </div>

      <style>{`
        .student-intro-container {
          max-width: 800px;
          margin: 40px auto; /* Increased margin for better spacing */
          padding: 40px; /* Increased padding for more content spacing */
          background-color: #f4f7f6; /* Light gray background */
          border-radius: 12px; /* Rounded corners for a softer look */
          box-shadow: 0 8px 16px rgba(36, 116, 220, 0.1); /* Subtle shadow for depth */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
          color: #2c3e50; /* Dark blue-gray text */
          line-height: 1.7;
        }

        .student-intro-title {
          font-size: 2.8em; /* Larger title */
          color: #34495e; /* Darker blue-gray title */
          margin-bottom: 30px;
          text-align: center;
          border-bottom: 3px solid #34495e; /* Underline for title */
          padding-bottom: 10px;
        }

        .student-intro-text {
          font-size: 1.1em;
          margin-bottom: 30px;
          text-align: justify;
          color: #34495e;
        }

        .student-guidelines,
        .academic-info,
        .student-support {
          margin-bottom: 40px;
          padding: 25px;
          background-color: #e0e5ec; /* Light blue-gray background for sections */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Softer shadow for sections */
          border-left: 5px solid #34495e; /* Left border accent */
        }

        h3 {
          font-size: 1.6em;
          color: #34495e;
          margin-top: 0;
          margin-bottom: 20px;
          border-bottom: 2px solid #34495e;
          padding-bottom: 8px;
        }

        ul {
          list-style: square;
          padding-left: 30px;
          margin-bottom: 20px;
        }

        ul li {
          font-size: 1.05em;
          color: #34495e;
          margin-bottom: 10px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .student-intro-container {
            margin: 20px auto;
            padding: 20px;
          }

          .student-intro-title {
            font-size: 2.2em;
            margin-bottom: 20px;
          }

          .student-intro-text {
            font-size: 1em;
          }

          .student-guidelines,
          .academic-info,
          .student-support {
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
        .student-intro-container:hover {
          transform: translateY(-5px); /* Slight lift on hover */
          transition: transform 0.3s ease-in-out;
        }

        h3 {
          transition: color 0.3s ease;
        }

        h3:hover {
          color: #2c3e50; /* Darker on hover */
        }

        ul li:hover {
          background-color: #dce3e1; /* Light background on hover */
          padding-left: 5px;
          transition: background-color 0.3s ease, padding-left 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default StudentIntro;