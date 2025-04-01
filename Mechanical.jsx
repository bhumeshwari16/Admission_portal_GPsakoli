import "./styles.css";
import Header from "./Header";
import Footer from "./Footer"; // Import Footer component

function Mechanical() {
  return (
    <div>
      <Header />
      <div className="department-container">
        <h2 className="department-title">Mechanical Engineering Department</h2>
        <p className="department-description">
          Mechanical Engineering involves the design, production, and maintenance of mechanical systems and machinery.
        </p>

        <h3 className="sub-title">Vision</h3>
        <p>To produce innovative mechanical engineers who drive technological advancements in industries.</p>

        <h3 className="sub-title">Mission</h3>
        <ul>
          <li>Provide hands-on training in mechanical systems.</li>
          <li>Encourage research in thermal and fluid sciences.</li>
          <li>Collaborate with industries for real-world applications.</li>
        </ul>

        <h3 className="sub-title">Courses & Subjects</h3>
        <ul>
          <li>Thermodynamics</li>
          <li>Fluid Mechanics</li>
          <li>Machine Design</li>
          <li>CAD/CAM</li>
        </ul>

        <h3 className="sub-title">Fee Structure</h3>
        <table className="fee-table">
          <thead>
            <tr><th>Category</th><th>Annual Fees (INR)</th></tr>
          </thead>
          <tbody>
            <tr><td>General</td><td>₹ 50,000</td></tr>
            <tr><td>SC/ST</td><td>₹ 12,000</td></tr>
            <tr><td>OBC</td><td>₹ 35,000</td></tr>
          </tbody>
        </table>

        <h3 className="sub-title">Seats Availability</h3>
        <table className="seats-table">
          <thead>
            <tr><th>Course</th><th>Seats Available</th></tr>
          </thead>
          <tbody>
            <tr><td>B.Tech Mechanical Engineering</td><td>60</td></tr>
            <tr><td>M.Tech Thermal Engineering</td><td>30</td></tr>
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

export default Mechanical;
