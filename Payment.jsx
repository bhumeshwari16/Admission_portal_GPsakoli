import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Admission = () => {
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: Documents, Step 3: Payment
  const [admissionId, setAdmissionId] = useState(null);
  const navigate = useNavigate();

  // Step 1: Admission Form Data
  const [formData, setFormData] = useState({
    admittedBranch: "",
    name: "",
    caste: "",
    dob: "",
    localGuardian: "",
    permanentAddress: "",
    mobile: "",
    occupation: "",
    whatsapp: "",
    email: "",
  });

  // Step 2: Document Upload
  const [documents, setDocuments] = useState({
    leavingCertificate: null,
    scMarksheet: null,
    hsscMarksheet: null,
    diplomaMarksheet: null,
    casteCertificate: null,
    domicileCertificate: null,
    nonCreamyLayer: null,
    gapCertificate: null,
  });

  // Step 3: Payment Details
  const [paymentData, setPaymentData] = useState({
    amount: "",
    ddNumber: "",
    date: "",
    receiptNumber: "",
    utrNumber: "",
    senderUpiId: "",
    receiverUpiId: "",
    utrPaymentSlip: null,
  });

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(false); // Success popup state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) setFormData({ ...formData, [name]: value });
    else if (step === 3) setPaymentData({ ...paymentData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (step === 2) setDocuments({ ...documents, [name]: files[0] });
    else if (step === 3) setPaymentData({ ...paymentData, [name]: files[0] });
  };

  // Validate inputs
  const validate = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.admittedBranch.trim()) newErrors.admittedBranch = "Admitted Branch is required";
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.caste.trim()) newErrors.caste = "Caste is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.localGuardian.trim()) newErrors.localGuardian = "Local Guardian is required";
      if (!formData.permanentAddress.trim()) newErrors.permanentAddress = "Permanent Address is required";
      if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = "Valid 10-digit mobile number required";
      if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
      if (!formData.whatsapp.match(/^\d{10}$/)) newErrors.whatsapp = "Valid 10-digit WhatsApp number required";
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required";
    } else if (step === 2) {
      Object.keys(documents).forEach((key) => {
        if (!documents[key]) newErrors[key] = "This document is required";
      });
    } else if (step === 3) {
      if (!paymentData.amount.trim()) newErrors.amount = "Amount is required";
      if (!paymentData.ddNumber.trim()) newErrors.ddNumber = "D.D. No. is required";
      if (!paymentData.date) newErrors.date = "Date is required";
      if (!paymentData.receiptNumber.trim()) newErrors.receiptNumber = "Receipt No. is required";
      if (!paymentData.utrNumber.trim()) newErrors.utrNumber = "UTR Number is required";
      if (!paymentData.senderUpiId.trim()) newErrors.senderUpiId = "Sender UPI ID is required";
      if (!paymentData.receiverUpiId.trim()) newErrors.receiverUpiId = "Receiver UPI ID is required";
      if (!paymentData.utrPaymentSlip) newErrors.utrPaymentSlip = "UTR Payment Slip is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submission for each step
  const handleNext = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (step === 1) {
        // Submit Admission Form
        const response = await fetch("http://localhost:5000/api/submit-admission", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          setAdmissionId(result.admissionId);
          setStep(2);
        } else {
          alert(`❌ Error: ${result.message}`);
        }
      } else if (step === 2) {
        // Upload Documents
        const formDataObj = new FormData();
        formDataObj.append("admissionId", admissionId);
        Object.keys(documents).forEach((key) => {
          formDataObj.append(key, documents[key]);
        });

        const response = await fetch("http://localhost:5000/api/upload-documents", {
          method: "POST",
          body: formDataObj,
        });

        const result = await response.json();
        if (response.ok) {
          setStep(3);
        } else {
          alert(`❌ Error: ${result.message}`);
        }
      } else if (step === 3) {
        // Submit Payment Details
        const formDataObj = new FormData();
        formDataObj.append("admissionId", admissionId);
        Object.keys(paymentData).forEach((key) => {
          formDataObj.append(key, paymentData[key]);
        });

        const response = await fetch("http://localhost:5000/api/payment-details", {
          method: "POST",
          body: formDataObj,
        });

        const result = await response.json();
        if (response.ok) {
          setPopup(true);
          setTimeout(() => {
            setPopup(false);
            navigate("/success");
          }, 2000);
        } else {
          alert(`❌ Error: ${result.message}`);
        }
      }
    } catch (error) {
      console.error("❌ Error submitting data:", error);
      alert("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>{step === 1 ? "Admission Form" : step === 2 ? "Document Upload" : "Payment Details"}</h2>
      <form onSubmit={handleNext}>
        {step === 1 && <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />}
        {step === 2 && <input type="file" name="leavingCertificate" onChange={handleFileChange} required />}
        {step === 3 && <input type="text" name="amount" placeholder="Amount" value={paymentData.amount} onChange={handleChange} required />}
        <button type="submit">{step === 3 ? "Submit" : "Next"}</button>
      </form>
      {popup && <div className="popup">✅ Submission Successful!</div>}
    </div>
  );
};

export default Admission;
