import "./styles.css";
import Header from "./Header";
import Footer from "./Footer"; // Import Footer component

function Computer() {
  return (
    <div>
      <Header />
      <div className="department-container">
        <h2 className="department-title">Computer Science & Engineering</h2>
        <p className="department-description">
          Innovating technology and software solutions for a smarter world.
        </p>

        <h3 className="sub-title">Vision</h3>
        <p>To lead in software innovations, AI, and data science research.</p>

        <h3 className="sub-title">Mission</h3>
        <ul>
          <li>Train students in modern programming and software development.</li>
          <li>Encourage research in AI and cybersecurity.</li>
          <li>Collaborate with IT industries for better job opportunities.</li>
        </ul>

        <h3 className="sub-title">Courses & Subjects</h3>
        <ul>
          <li>Artificial Intelligence</li>
          <li>Data Science</li>
          <li>Web Development</li>
          <li>Machine Learning</li>
        </ul>

        <h3 className="sub-title">Fee Structure</h3>
        <table className="fee-table">
          <thead>
            <tr><th>Category</th><th>Annual Fees (INR)</th></tr>
          </thead>
          <tbody>
            <tr><td>General</td><td>₹ 55,000</td></tr>
            <tr><td>SC/ST</td><td>₹ 20,000</td></tr>
          </tbody>
        </table>

        <h3 className="sub-title">Seats Availability</h3>
        <table className="seats-table">
          <thead>
            <tr><th>Course</th><th>Seats Available</th></tr>
          </thead>
          <tbody>
            <tr><td>B.Tech Computer Engineering</td><td>60</td></tr>
          </tbody>
        </table>
      </div>
      <div>
      {/* Other Components */}
      <Footer />
    </div>
    </div>
  );
}

export default Computer;
