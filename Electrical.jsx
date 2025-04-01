import "./styles.css";
import Header from "./Header";
import Footer from "./Footer"; // Import Footer component


function Electrical() {
  return (
    <div>
      <Header />
      <div className="department-container">
        <h2 className="department-title">Electrical Engineering</h2>
        <p className="department-description">
          Electrical Engineering focuses on the study of power systems, electrical machines, and renewable energy technologies.
        </p>

        <h3 className="sub-title">Vision</h3>
        <p>To produce skilled electrical engineers contributing to power and energy solutions.</p>

        <h3 className="sub-title">Mission</h3>
        <ul>
          <li>Provide high-quality education in electrical systems and power electronics.</li>
          <li>Develop research in renewable energy and smart grid technology.</li>
          <li>Encourage innovation in electrical automation and control.</li>
          <li>Promote collaborations with industries for skill enhancement.</li>
        </ul>

        <h3 className="sub-title">Courses & Subjects</h3>
        <ul>
          <li>Power Systems</li>
          <li>Control Engineering</li>
          <li>Renewable Energy Sources</li>
          <li>Electrical Machines</li>
        </ul>

        <h3 className="sub-title">Fee Structure</h3>
        <table className="fee-table">
          <thead>
            <tr><th>Category</th><th>Annual Fees (INR)</th></tr>
          </thead>
          <tbody>
            <tr><td>General</td><td>₹ 52,000</td></tr>
            <tr><td>SC/ST</td><td>₹ 18,000</td></tr>
            <tr><td>OBC</td><td>₹ 38,000</td></tr>
          </tbody>
        </table>

        <h3 className="sub-title">Seats Availability</h3>
        <table className="seats-table">
          <thead>
            <tr><th>Course</th><th>Seats Available</th></tr>
          </thead>
          <tbody>
            <tr><td>B.Tech Electrical Engineering</td><td>60</td></tr>
            <tr><td>M.Tech Power Electronics</td><td>30</td></tr>
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

export default Electrical;
