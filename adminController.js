const db = require("../config/db");

// ✅ Fetch all admissions with documents and payment details
exports.getAllAdmissions = async (req, res) => {
  try {
    const [admissions] = await db.query("SELECT * FROM admissions");

    for (let admission of admissions) {
      // Fetch documents for each admission
      const [documents] = await db.query(
        "SELECT * FROM admission_documents WHERE admission_id = ?",
        [admission.id]
      );
      admission.documents = documents.length > 0 ? documents[0] : null;

      // Fetch payment details for each admission
      const [payments] = await db.query(
        "SELECT * FROM admission_payments WHERE admission_id = ?",
        [admission.id]
      );
      admission.payments = payments.length > 0 ? payments[0] : null;
    }

    res.json(admissions);
  } catch (error) {
    console.error("Error fetching admissions:", error);
    res.status(500).json({ error: "Error fetching admissions" });
  }
};

// ✅ Fetch all student login requests (pending approvals)
exports.getAllLoginRequests = async (req, res) => {
  try {
    const [requests] = await db.query("SELECT * FROM students WHERE status = 'pending'");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching login requests" });
  }
};

// ✅ Fetch all approved students
exports.getAllStudents = async (req, res) => {
  try {
    const [students] = await db.query("SELECT * FROM students");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

// ✅ Approve student login request
exports.approveLoginRequest = async (req, res) => {
  const { id } = req.body;
  try {
    await db.query("UPDATE students SET status = 'approved' WHERE id = ?", [id]);
    res.json({ message: "Student login approved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error approving login request" });
  }
};

// ✅ Deny student login request
exports.denyLoginRequest = async (req, res) => {
  const { id } = req.body;
  try {
    await db.query("UPDATE students SET status = 'denied' WHERE id = ?", [id]);
    res.json({ message: "Student login request denied!" });
  } catch (error) {
    res.status(500).json({ error: "Error denying login request" });
  }
};

// ✅ Delete an admission record
exports.deleteAdmission = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM admissions WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admission not found" });
    }

    res.json({ message: "Admission deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting admission" });
  }
};

// ✅ Delete a student record
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully!" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
};
