import "./styles.css";
import Header from "./Header";
import Footer from "./Footer"; // Import Footer component

function Electronics() {
  return (
    <div>
      <Header />
      <div className="department-container">
        <h2 className="department-title">Electronics & Telecommunication Engineering</h2>
        <p className="department-description">
          Electronics & Telecommunication Engineering focuses on the development of communication and signal processing systems.
        </p>

        <h3 className="sub-title">Vision</h3>
        <p>To advance communication technology and digital systems for global connectivity.</p>

        <h3 className="sub-title">Mission</h3>
        <ul>
          <li>Provide knowledge in electronics and communication systems.</li>
          <li>Encourage innovation in wireless technology.</li>
          <li>Train students in VLSI, Embedded Systems, and IoT.</li>
          <li>Promote industry collaborations for practical exposure.</li>
        </ul>

        <h3 className="sub-title">Courses & Subjects</h3>
        <ul>
          <li>Digital Signal Processing</li>
          <li>Microprocessor & Microcontrollers</li>
          <li>Wireless Communication</li>
          <li>Embedded Systems</li>
        </ul>

        <h3 className="sub-title">Fee Structure</h3>
        <table className="fee-table">
          <thead>
            <tr><th>Category</th><th>Annual Fees (INR)</th></tr>
          </thead>
          <tbody>
            <tr><td>General</td><td>₹ 50,000</td></tr>
            <tr><td>SC/ST</td><td>₹ 15,000</td></tr>
            <tr><td>OBC</td><td>₹ 35,000</td></tr>
          </tbody>
        </table>

        <h3 className="sub-title">Seats Availability</h3>
        <table className="seats-table">
          <thead>
            <tr><th>Course</th><th>Seats Available</th></tr>
          </thead>
          <tbody>
            <tr><td>B.Tech Electronics & Telecommunication</td><td>60</td></tr>
            <tr><td>M.Tech VLSI Design</td><td>30</td></tr>
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

export default Electronics;
