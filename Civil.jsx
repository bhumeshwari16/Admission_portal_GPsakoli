
import Header from "./Header";
import Footer from "./Footer"; // Import Footer component

function Civil() {
  return (
    <div>
      <Header />
      <div className="department-container">
        <h2 className="department-title">Civil Engineering Department</h2>
        <p className="department-description">
          Civil Engineering deals with the design, construction, and maintenance of infrastructure, including buildings, roads, and bridges.
        </p>

        <h3 className="sub-title">Vision</h3>
        <p>To create highly skilled civil engineers who contribute to sustainable development and innovative infrastructure.</p>

        <h3 className="sub-title">Mission</h3>
        <ul>
          <li>Provide quality education in civil engineering.</li>
          <li>Promote research and development in infrastructure.</li>
          <li>Enhance industry collaboration for practical learning.</li>
          <li>Encourage eco-friendly and sustainable construction practices.</li>
        </ul>

        <h3 className="sub-title">Courses & Subjects</h3>
        <ul>
          <li>Structural Engineering</li>
          <li>Geotechnical Engineering</li>
          <li>Transportation Engineering</li>
          <li>Environmental Engineering</li>
        </ul>

        <h3 className="sub-title">Fee Structure</h3>
        <table className="fee-table">
          <thead>
            <tr><th>Category</th><th>Annual Fees (INR)</th></tr>
          </thead>
          <tbody>
            <tr><td>General</td><td>₹ 45,000</td></tr>
            <tr><td>SC/ST</td><td>₹ 10,000</td></tr>
            <tr><td>OBC</td><td>₹ 30,000</td></tr>
          </tbody>
        </table>

        <h3 className="sub-title">Seats Availability</h3>
        <table className="seats-table">
          <thead>
            <tr><th>Course</th><th>Seats Available</th></tr>
          </thead>
          <tbody>
            <tr><td>B.Tech Civil Engineering</td><td>60</td></tr>
            <tr><td>M.Tech Structural Engineering</td><td>30</td></tr>
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

export default Civil;
