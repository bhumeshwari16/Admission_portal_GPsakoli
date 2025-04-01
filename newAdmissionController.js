// backend/controllers/newAdmissionController.js
const pool = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const submitNewAdmission = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    console.log('Backend Received Data:', formData);
    console.log('Backend Received Files:', files);

    if (!formData.name || !formData.email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Insert into admissions table using an array for values
    const [admissionResult] = await pool.execute(
      'INSERT INTO admissions (admittedBranch, name, motherName, fatherName, caste, dob, localGuardian, permanentAddress, currentAddress, mobile, occupation, whatsapp, email, nationality, gender, aadharNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        formData.admittedBranch,
        formData.name,
        formData.motherName,
        formData.fatherName,
        formData.caste,
        formData.dob,
        formData.localGuardian,
        formData.permanentAddress,
        formData.currentAddress,
        formData.mobile,
        formData.occupation,
        formData.whatsapp,
        formData.email,
        formData.nationality,
        formData.gender,
        formData.aadharNumber,
      ]
    );
    const admissionId = admissionResult.insertId;
    console.log('Admission inserted with ID:', admissionId);

    // Insert into admission_documents table
    try {
      await pool.execute(
        'INSERT INTO admission_documents (admission_id, leavingCertificate, scMarksheet, hsscMarksheet, diplomaMarksheet, casteCertificate, domicileCertificate, nonCreamyLayer, gapCertificate, aadharCard, passportPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          admissionId,
          files.leavingCertificate ? files.leavingCertificate[0].path : null,
          files.scMarksheet ? files.scMarksheet[0].path : null,
          files.hsscMarksheet ? files.hsscMarksheet[0].path : null,
          files.diplomaMarksheet ? files.diplomaMarksheet[0].path : null,
          files.casteCertificate ? files.casteCertificate[0].path : null,
          files.domicileCertificate ? files.domicileCertificate[0].path : null,
          files.nonCreamyLayer ? files.nonCreamyLayer[0].path : null,
          files.gapCertificate ? files.gapCertificate[0].path : null,
          files.aadharCard ? files.aadharCard[0].path : null,
          files.passportPhoto ? files.passportPhoto[0].path : null,
        ]
      );
      console.log('Documents inserted');
    } catch (docError) {
      console.error('Error inserting documents:', docError);
    }

    // Insert into admission_payments table
    try {
      await pool.execute(
        'INSERT INTO admission_payments (admission_id, amount, ddNumber, date, receiptNumber, utrNumber, senderUpiId, receiverUpiId, utrPaymentSlip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          admissionId,
          formData.amount,
          formData.ddNumber,
          formData.paymentDate,
          formData.receiptNumber,
          formData.utrNumber,
          formData.senderUpild,
          formData.receiverUpild,
          files.utrPaymentSlip ? files.utrPaymentSlip[0].path : null,
        ]
      );
      console.log('Payment details inserted');
    } catch (paymentError) {
      console.error('Error inserting payment details:', paymentError);
    }

    res.status(200).json({ message: 'New admission submitted successfully!' });
  } catch (error) {
    console.error('Error submitting new admission:', error);
    console.error("Full Error Object:", error); // Log the entire error object
    res.status(500).json({ message: 'Failed to submit new admission (Backend Error).', error: error.message });
  }
};

module.exports = { submitNewAdmission, upload };