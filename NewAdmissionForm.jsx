import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"; // Import Footer component


const NewAdmissionForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Student Details
    admittedBranch: "",
    name: "",
    motherName: "",
    fatherName: "",
    caste: "",
    dob: "",
    localGuardian: "",
    permanentAddress: "",
    currentAddress: "",
    mobile: "",
    occupation: "",
    whatsapp: "",
    email: "",
    nationality: "",
    gender: "",
    aadharNumber: "",
  });

  const [documents, setDocuments] = useState({
    leavingCertificate: null,
    scMarksheet: null,
    hsscMarksheet: null,
    diplomaMarksheet: null,
    casteCertificate: null,
    domicileCertificate: null,
    nonCreamyLayer: null,
    gapCertificate: null,
    aadharCard: null,
    passportPhoto: null,
  });

  const [paymentData, setPaymentData] = useState({
    amount: "",
    ddNumber: "",
    paymentDate: "",
    receiptNumber: "",
    utrNumber: "",
    senderUpild: "",
    receiverUpild: "",
    utrPaymentSlip: null,
  });

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(false);

  // Input suggestions
  const inputSuggestions = {
    admittedBranch: ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"],
    caste: ["General", "OBC", "SC", "ST", "NT", "VJ"],
    occupation: ["Student", "Employed", "Self-employed", "Unemployed"],
    nationality: ["Indian", "Other"],
    gender: ["Male", "Female", "Other"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleDocumentChange = (e) => {
    const { name, files } = e.target;
    setDocuments({ ...documents, [name]: files[0] });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePaymentFileChange = (e) => {
    const { name, files } = e.target;
    setPaymentData({ ...paymentData, [name]: files[0] });
  };

  const validateStep = (step) => {
    let newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
      if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required";
    }
    
    if (step === 3) {
      if (!paymentData.amount.trim()) newErrors.amount = "Amount is required";
      if (!paymentData.paymentDate.trim()) newErrors.paymentDate = "Payment date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      const formDataToSend = new FormData();

      // Append form data
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Append documents
      for (const key in documents) {
        if (documents[key]) {
          formDataToSend.append(key, documents[key]);
        }
      }

      // Append payment data
      for (const key in paymentData) {
        formDataToSend.append(key, paymentData[key]);
      }

      try {
        const response = await fetch("http://localhost:5000/api/new-admission-submit", {
          method: "POST",
          body: formDataToSend,
        });

        const result = await response.json();

        if (response.ok) {
          setPopup(true);
          setTimeout(() => {
            setPopup(false);ss
            navigate("/Home");
          }, 2000);
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit. Please try again.");
      }
    }
  };

  // Styles
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f8f9ff",
      borderRadius: "10px",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    },
    header: {
      textAlign: "center",
      color: "#4a4de8",
      marginBottom: "30px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    section: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    sectionTitle: {
      color: "#4a4de8",
      marginBottom: "20px",
      paddingBottom: "10px",
      borderBottom: "2px solid #e0e2ff",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "600",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    error: {
      color: "#ff4757",
      fontSize: "14px",
      marginTop: "5px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "12px 25px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    primaryButton: {
      backgroundColor: "#4a4de8",
      color: "white",
      "&:hover": {
        backgroundColor: "#3a3dd8",
      },
    },
    secondaryButton: {
      backgroundColor: "#e0e2ff",
      color: "#4a4de8",
      "&:hover": {
        backgroundColor: "#d0d3ff",
      },
    },
    popup: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#2ecc71",
      color: "white",
      padding: "15px 25px",
      borderRadius: "4px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
      zIndex: "1000",
    },
    suggestion: {
      fontSize: "12px",
      color: "#777",
      fontStyle: "italic",
      marginTop: "5px",
    },
    progressBar: {
      height: "6px",
      backgroundColor: "#e0e2ff",
      borderRadius: "3px",
      marginBottom: "30px",
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      backgroundColor: "#4a4de8",
      width: `${(step / 3) * 100}%`,
      transition: "width 0.3s ease",
    },
    stepIndicator: {
      textAlign: "center",
      color: "#777",
      marginBottom: "20px",
    },
    "@media (max-width: 768px)": {
      container: {
        padding: "15px",
      },
      button: {
        padding: "10px 20px",
      },
    },
    "@media (max-width: 480px)": {
      buttonGroup: {
        flexDirection: "column",
        gap: "10px",
      },
      button: {
        width: "100%",
      },
    },
  };

  return (
    <div>  <Header />
    <br></br><br></br><br></br>
    <div style={styles.container}>
      <h1 style={styles.header}>New Student Admission Form</h1>
      
      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div style={styles.progress}></div>
      </div>
      <div style={styles.stepIndicator}>Step {step} of 3</div>

      {popup && (
        <div style={styles.popup}>
          ✅ Admission Submitted Successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
      {/* Step 1: Student Details */}
{step === 1 && (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>Student Details</h2>
    
    <div style={styles.formGroup}>
      <label htmlFor="admittedBranch" style={styles.label}>Branch</label>
      <select
        id="admittedBranch"
        name="admittedBranch"
        value={formData.admittedBranch}
        onChange={handleChange}
        style={styles.select}
        required
      >
        <option value="">Select Branch</option>
        {inputSuggestions.admittedBranch.map((branch) => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>
      <p style={styles.suggestion}>Select your course branch</p>
      {errors.admittedBranch && <span style={styles.error}>{errors.admittedBranch}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="name" style={styles.label}>Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., John Doe"
        required
      />
      <p style={styles.suggestion}>Enter your full name as per documents</p>
      {errors.name && <span style={styles.error}>{errors.name}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="fatherName" style={styles.label}>Father's Name</label>
      <input
        type="text"
        id="fatherName"
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., Robert Doe"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="motherName" style={styles.label}>Mother's Name</label>
      <input
        type="text"
        id="motherName"
        name="motherName"
        value={formData.motherName}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., Mary Doe"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="caste" style={styles.label}>Caste</label>
      <select
        id="caste"
        name="caste"
        value={formData.caste}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">Select Caste</option>
        {inputSuggestions.caste.map((caste) => (
          <option key={caste} value={caste}>{caste}</option>
        ))}
      </select>
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="dob" style={styles.label}>Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        style={styles.input}
        required
      />
      {errors.dob && <span style={styles.error}>{errors.dob}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="localGuardian" style={styles.label}>Local Guardian</label>
      <input
        type="text"
        id="localGuardian"
        name="localGuardian"
        value={formData.localGuardian}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., Guardian Name"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="permanentAddress" style={styles.label}>Permanent Address</label>
      <input
        type="text"
        id="permanentAddress"
        name="permanentAddress"
        value={formData.permanentAddress}
        onChange={handleChange}
        style={styles.input}
        placeholder="Full permanent address"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="currentAddress" style={styles.label}>Current Address</label>
      <input
        type="text"
        id="currentAddress"
        name="currentAddress"
        value={formData.currentAddress}
        onChange={handleChange}
        style={styles.input}
        placeholder="Full current address"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="mobile" style={styles.label}>Mobile Number</label>
      <input
        type="tel"
        id="mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., 9876543210"
        required
      />
      {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="occupation" style={styles.label}>Occupation</label>
      <select
        id="occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">Select Occupation</option>
        {inputSuggestions.occupation.map((occupation) => (
          <option key={occupation} value={occupation}>{occupation}</option>
        ))}
      </select>
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="whatsapp" style={styles.label}>WhatsApp Number</label>
      <input
        type="tel"
        id="whatsapp"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., 9876543210"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="email" style={styles.label}>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., john.doe@example.com"
        required
      />
      {errors.email && <span style={styles.error}>{errors.email}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="nationality" style={styles.label}>Nationality</label>
      <select
        id="nationality"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">Select Nationality</option>
        {inputSuggestions.nationality.map((nationality) => (
          <option key={nationality} value={nationality}>{nationality}</option>
        ))}
      </select>
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="gender" style={styles.label}>Gender</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">Select Gender</option>
        {inputSuggestions.gender.map((gender) => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </select>
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="aadharNumber" style={styles.label}>Aadhar Number</label>
      <input
        type="text"
        id="aadharNumber"
        name="aadharNumber"
        value={formData.aadharNumber}
        onChange={handleChange}
        style={styles.input}
        placeholder="e.g., 1234 5678 9012"
      />
    </div>

    <div style={styles.buttonGroup}>
      <div></div> {/* Empty div for spacing */}
      <button
        type="button"
        onClick={nextStep}
        style={{ ...styles.button, ...styles.primaryButton }}
      >
        Next: Documents
      </button>
    </div>
  </div>
)}

        {/* Step 2: Documents */}
        {step === 2 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Document Uploads</h2>
            
            <div style={styles.formGroup}>
              <label htmlFor="leavingCertificate" style={styles.label}>Leaving Certificate</label>
              <input
                type="file"
                id="leavingCertificate"
                name="leavingCertificate"
                onChange={handleDocumentChange}
                style={styles.input}
              />
              <p style={styles.suggestion}>Upload scanned copy (PDF/JPEG/PNG)</p>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="scMarksheet" style={styles.label}>10th Marksheet</label>
              <input
                type="file"
                id="scMarksheet"
                name="scMarksheet"
                onChange={handleDocumentChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="hsscMarksheet" style={styles.label}>12th Marksheet</label>
              <input
                type="file"
                id="hsscMarksheet"
                name="hsscMarksheet"
                onChange={handleDocumentChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="diplomaMarksheet" style={styles.label}>Diploma Marksheet (if applicable)</label>
              <input
                type="file"
                id="diplomaMarksheet"
                name="diplomaMarksheet"
                onChange={handleDocumentChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="casteCertificate" style={styles.label}>Caste Certificate</label>
              <input
                type="file"
                id="casteCertificate"
                name="casteCertificate"
                onChange={handleDocumentChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="aadharCard" style={styles.label}>Aadhar Card</label>
              <input
                type="file"
                id="aadharCard"
                name="aadharCard"
                onChange={handleDocumentChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="passportPhoto" style={styles.label}>Passport Photo</label>
              <input
                type="file"
                id="passportPhoto"
                name="passportPhoto"
                onChange={handleDocumentChange}
                style={styles.input}
              />
              <p style={styles.suggestion}>Upload recent passport size photo (JPEG/PNG)</p>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={prevStep}
                style={{ ...styles.button, ...styles.secondaryButton }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                Next: Payment
              </button>
            </div>
          </div>
        )}

       {/* Step 3: Payment Details */}
{step === 3 && (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>Payment Details</h2>
    
    <div style={styles.formGroup}>
      <label htmlFor="amount" style={styles.label}>Amount Paid (₹)</label>
      <input
        type="text"
        id="amount"
        name="amount"
        value={paymentData.amount}
        onChange={handlePaymentChange}
        style={styles.input}
        placeholder="e.g., 5000"
        required
      />
      {errors.amount && <span style={styles.error}>{errors.amount}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="ddNumber" style={styles.label}>DD Number</label>
      <input
        type="text"
        id="ddNumber"
        name="ddNumber"
        value={paymentData.ddNumber}
        onChange={handlePaymentChange}
        style={styles.input}
        placeholder="e.g., DD123456"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="paymentDate" style={styles.label}>Payment Date</label>
      <input
        type="date"
        id="paymentDate"
        name="paymentDate"
        value={paymentData.paymentDate}
        onChange={handlePaymentChange}
        style={styles.input}
        required
      />
      {errors.paymentDate && <span style={styles.error}>{errors.paymentDate}</span>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="receiptNumber" style={styles.label}>Receipt Number</label>
      <input
        type="text"
        id="receiptNumber"
        name="receiptNumber"
        value={paymentData.receiptNumber}
        onChange={handlePaymentChange}
        style={styles.input}
        placeholder="e.g., REC12345"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="utrNumber" style={styles.label}>UTR Number</label>
      <input
        type="text"
        id="utrNumber"
        name="utrNumber"
        value={paymentData.utrNumber}
        onChange={handlePaymentChange}
        style={styles.input}
        placeholder="e.g., 123456789012"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="senderUpild" style={styles.label}>Sender UPI ID</label>
      <input
        type="text"
        id="senderUpild"
        name="senderUpild"
        value={paymentData.senderUpild}
        onChange={handlePaymentChange}
        style={styles.input}
        placeholder="e.g., name@upi"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="receiverUpild" style={styles.label}>Receiver UPI ID</label>
      <input
        type="text"
        id="receiverUpild"
        name="receiverUpild"
        value={paymentData.receiverUpild}
        onChange={handlePaymentChange}
        style={styles.input}
        placeholder="e.g., college@upi"
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="utrPaymentSlip" style={styles.label}>Payment Proof</label>
      <input
        type="file"
        id="utrPaymentSlip"
        name="utrPaymentSlip"
        onChange={handlePaymentFileChange}
        style={styles.input}
      />
      <p style={styles.suggestion}>Upload scanned copy of payment receipt/slip</p>
    </div>

    <div style={styles.buttonGroup}>
      <button
        type="button"
        onClick={prevStep}
        style={{ ...styles.button, ...styles.secondaryButton }}
      >
        Back
      </button>
      <button
        type="submit"
        style={{ ...styles.button, ...styles.primaryButton }}
      >
        Submit Admission
      </button>
    </div>
  </div>
)}
      </form>
    </div>
    <br></br><br></br><br></br>
    <Footer />
    </div>
  );
};

export default NewAdmissionForm;