import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loginRequests, setLoginRequests] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("admissions");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [filteredLoginRequests, setFilteredLoginRequests] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [branchStats, setBranchStats] = useState({});
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  // Define all available branches with seat capacities
  const allBranches = [
    { name: "Computer Science", seats: 60 },
    { name: "Electrical", seats: 60 },
    { name: "Mechanical", seats: 60 },
    { name: "Civil", seats: 60 },
    { name: "Electronics", seats: 30 }, // Electronics has only 30 seats
    { name: "Information Technology", seats: 60 }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const endpoints = ["admissions", "login-requests", "students"];
        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`http://localhost:5000/api/admin/${endpoint}`)
          )
        );
        const data = await Promise.all(responses.map((res) => res.json()));
        setAdmissions(data[0]);
        setLoginRequests(data[1]);
        setStudents(data[2]);
        setFilteredAdmissions(data[0]);
        setFilteredLoginRequests(data[1]);
        setFilteredStudents(data[2]);
        calculateBranchStats(data[0], data[2]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Calculate branch statistics
  const calculateBranchStats = (admissions, students) => {
    const stats = {};
    
    allBranches.forEach(branch => {
      const admittedStudents = admissions.filter(ad => ad.admittedBranch === branch.name).length;
      const activeStudents = students.filter(student => {
        return student.branch === branch.name && student.status === 'approved';
      }).length;
      
      stats[branch.name] = {
        admitted: admittedStudents,
        active: activeStudents,
        remaining: branch.seats - admittedStudents,
        percentage: Math.round((activeStudents / branch.seats) * 100),
        totalSeats: branch.seats
      };
    });
    
    setBranchStats(stats);
  };

  useEffect(() => {
    const filterData = () => {
      if (searchTerm.trim() === "") {
        setFilteredAdmissions(admissions);
        setFilteredLoginRequests(loginRequests);
        setFilteredStudents(students);
        return;
      }

      const term = searchTerm.toLowerCase();
      setFilteredAdmissions(
        admissions.filter(
          (admission) =>
            admission.name?.toLowerCase().includes(term) ||
            admission.email?.toLowerCase().includes(term) ||
            admission.mobile?.includes(term) ||
            admission.admittedBranch?.toLowerCase().includes(term)
        )
      );
      setFilteredLoginRequests(
        loginRequests.filter(
          (login) =>
            login.name?.toLowerCase().includes(term) ||
            login.email?.toLowerCase().includes(term) ||
            login.denNumber?.includes(term)
        )
      );
      setFilteredStudents(
        students.filter(
          (student) =>
            student.name?.toLowerCase().includes(term) ||
            student.email?.toLowerCase().includes(term) ||
            student.denNumber?.includes(term) ||
            student.branch?.toLowerCase().includes(term)
        )
      );
    };

    filterData();
  }, [searchTerm, admissions, loginRequests, students]);

  // Approve login request
  const handleApproveLogin = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/approve-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message);
      
      // Update login requests list
      const updatedLoginRequests = loginRequests.filter((req) => req.id !== id);
      setLoginRequests(updatedLoginRequests);
      setFilteredLoginRequests(updatedLoginRequests);
      
      // Update students list with new approved student
      const approvedStudent = loginRequests.find(req => req.id === id);
      if (approvedStudent) {
        const newStudent = {
          ...approvedStudent,
          status: 'approved',
          id: Date.now() // Generate a new ID or use one from the server
        };
        setStudents([...students, newStudent]);
        setFilteredStudents([...students, newStudent]);
        calculateBranchStats(admissions, [...students, newStudent]);
      }
    } catch (err) {
      console.error("Error approving login:", err);
      alert("Failed to approve login request");
    }
  };

  // Deny login request
  const handleDenyLogin = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/deny-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message);
      
      // Update login requests list
      const updatedLoginRequests = loginRequests.map((req) =>
        req.id === id ? { ...req, status: "denied" } : req
      );
      setLoginRequests(updatedLoginRequests);
      setFilteredLoginRequests(updatedLoginRequests);
      
      // Add to students list with denied status
      const deniedStudent = loginRequests.find(req => req.id === id);
      if (deniedStudent) {
        const newStudent = {
          ...deniedStudent,
          status: 'denied',
          id: Date.now() // Generate a new ID or use one from the server
        };
        setStudents([...students, newStudent]);
        setFilteredStudents([...students, newStudent]);
      }
    } catch (err) {
      console.error("Error denying login:", err);
      alert("Failed to deny login request");
    }
  };

  // Delete student by ID
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete student.");
      }

      const data = await response.json();
      alert(data.message);
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      calculateBranchStats(admissions, updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error: " + error.message);
    }
  };

  // Delete an admission
  const handleDeleteAdmission = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admission?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/admissions/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      alert(data.message);
      const updatedAdmissions = admissions.filter((admission) => admission.id !== id);
      setAdmissions(updatedAdmissions);
      setFilteredAdmissions(updatedAdmissions);
      calculateBranchStats(updatedAdmissions, students);
    } catch (err) {
      console.error("Error deleting admission:", err);
      alert("Failed to delete admission");
    }
  };

  // View admission details
  const handleViewAdmission = (admission) => {
    setSelectedAdmission(admission);
  };

  // Close modal
  const closeModal = () => {
    setSelectedAdmission(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/Adminlogin");
  };

  // Refresh all data
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const endpoints = ["admissions", "login-requests", "students"];
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(`http://localhost:5000/api/admin/${endpoint}`)
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      setAdmissions(data[0]);
      setLoginRequests(data[1]);
      setStudents(data[2]);
      setFilteredAdmissions(data[0]);
      setFilteredLoginRequests(data[1]);
      setFilteredStudents(data[2]);
      calculateBranchStats(data[0], data[2]);
      setSearchTerm("");
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError("Failed to refresh data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const styles = {
    adminDashboard: {
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f8f9ff",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7ff 0%, #f0f2ff 100%)",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "30px",
    },
    header: {
      color: "#4a4de8",
      fontSize: "2.5rem",
      fontWeight: "700",
      textShadow: "2px 2px 4px rgba(74,77,232,0.1)",
      background: "linear-gradient(90deg, #4a4de8, #6a4de8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: 0,
    },
    searchContainer: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    searchWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
      color: "#777",
      zIndex: 1,
    },
    searchInput: {
      padding: "10px 15px 10px 40px",
      borderRadius: "50px",
      border: "1px solid #e0e2ff",
      minWidth: "250px",
      fontSize: "0.9rem",
      outline: "none",
      transition: "all 0.3s ease",
      boxShadow: searchFocused ? "0 0 0 3px rgba(74,77,232,0.2)" : "none",
      borderColor: searchFocused ? "#4a4de8" : "#e0e2ff",
    },
    refreshButton: {
      padding: "10px 20px",
      borderRadius: "50px",
      border: "none",
      backgroundColor: "#4a4de8",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#3a3dd8",
        transform: "translateY(-2px)",
      },
    },
    logoutButton: {
      padding: "10px 20px",
      borderRadius: "50px",
      border: "none",
      backgroundColor: "#ff4757",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#e8414d",
        transform: "translateY(-2px)",
      },
    },
    tabsContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "25px",
      flexWrap: "wrap",
      gap: "10px",
    },
    tabButton: {
      padding: "12px 25px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      backgroundColor: "#e0e2ff",
      color: "#4a4de8",
      boxShadow: "0 2px 5px rgba(74,77,232,0.1)",
      "&:hover": {
        backgroundColor: "#d0d3ff",
      },
    },
    activeTab: {
      backgroundColor: "#4a4de8",
      color: "white",
      boxShadow: "0 4px 10px rgba(74,77,232,0.3)",
    },
    tabContent: {
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(74,77,232,0.1)",
      padding: "25px",
      marginBottom: "30px",
      overflowX: "auto",
      border: "1px solid #e0e2ff",
    },
    sectionTitle: {
      color: "#4a4de8",
      marginBottom: "20px",
      fontSize: "1.6rem",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      "&:before": {
        content: '""',
        display: "inline-block",
        width: "10px",
        height: "25px",
        backgroundColor: "#4a4de8",
        borderRadius: "5px",
        marginRight: "10px",
      },
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      marginTop: "15px",
      borderRadius: "10px",
      overflow: "hidden",
    },
    tableHead: {
      background: "#f8f9fa", // Light gray background
      color: "#000000", // Black text
      borderBottom: "2px solid #dee2e6", // Bottom border
    },
    tableHeader: {
      padding: "15px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "0.95rem",
      color: "#212529", // Dark gray (almost black)
      borderRight: "1px solid #dee2e6", // Right border between columns
      "&:last-child": {
        borderRight: "none", // Remove border from last column
      },
    },
    tableRow: {
      backgroundColor: "white",
      transition: "all 0.3s ease",
      "&:nth-child(even)": {
        backgroundColor: "#f8f9ff",
      },
      "&:hover": {
        backgroundColor: "#eef0ff",
        transform: "translateX(5px)",
      },
    },
    tableCell: {
      padding: "15px",
      color: "#555",
      borderBottom: "1px solid #e0e2ff",
      fontSize: "0.9rem",
    },
    button: {
      padding: "8px 15px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      marginRight: "8px",
      transition: "all 0.3s ease",
      fontSize: "0.85rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      "& svg": {
        marginRight: "5px",
      },
    },
    viewButton: {
      backgroundColor: "#4a4de8",
      color: "white",
      "&:hover": {
        backgroundColor: "#3a3dd8",
        transform: "translateY(-2px)",
      },
    },
    deleteButton: {
      backgroundColor: "#ff4757",
      color: "white",
      "&:hover": {
        backgroundColor: "#e8414d",
        transform: "translateY(-2px)",
      },
    },
    approveButton: {
      backgroundColor: "#2ed573",
      color: "white",
      "&:hover": {
        backgroundColor: "#25c562",
        transform: "translateY(-2px)",
      },
    },
    denyButton: {
      backgroundColor: "#ffa502",
      color: "white",
      "&:hover": {
        backgroundColor: "#e69500",
        transform: "translateY(-2px)",
      },
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(74,77,232,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
      backdropFilter: "blur(5px)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(74,77,232,0.3)",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "85vh",
      overflowY: "auto",
      position: "relative",
      border: "2px solid #4a4de8",
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      right: "20px",
      fontSize: "1.8rem",
      cursor: "pointer",
      color: "#4a4de8",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "rotate(90deg)",
        color: "#ff4757",
      },
    },
    modalTitle: {
      color: "#4a4de8",
      marginBottom: "25px",
      fontSize: "1.8rem",
      fontWeight: "700",
      textAlign: "center",
      borderBottom: "2px solid #e0e2ff",
      paddingBottom: "10px",
    },
    detailItem: {
      marginBottom: "12px",
      lineHeight: "1.7",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "#f8f9ff",
      display: "flex",
      flexWrap: "wrap",
    },
    detailLabel: {
      fontWeight: "600",
      color: "#4a4de8",
      marginRight: "8px",
      minWidth: "150px",
    },
    detailValue: {
      color: "#555",
      flex: "1",
    },
    documentLink: {
      color: "#4a4de8",
      textDecoration: "none",
      marginLeft: "10px",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 10px",
      borderRadius: "5px",
      backgroundColor: "#e0e2ff",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#4a4de8",
        color: "white",
        transform: "translateY(-2px)",
      },
    },
    loading: {
      textAlign: "center",
      padding: "30px",
      color: "#4a4de8",
      fontSize: "1.2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    loadingSpinner: {
      border: "4px solid #e0e2ff",
      borderTop: "4px solid #4a4de8",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
      marginBottom: "15px",
    },
    error: {
      color: "#ff4757",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#fff0f1",
      borderRadius: "10px",
      margin: "20px 0",
      border: "1px solid #ffd1d1",
      fontWeight: "600",
    },
    responsiveTable: {
      overflowX: "auto",
      borderRadius: "10px",
      border: "1px solid #e0e2ff",
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    statsContainer: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "30px",
    },
    statCard: {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "20px",
  minWidth: "200px", // Keep only one minWidth definition
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(74,77,232,0.1)",
  transition: "all 0.3s ease",
  flex: "1",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(74,77,232,0.2)"
  }
},
    statValue: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#4a4de8",
      margin: "10px 0",
    },
    statLabel: {
      color: "#777",
      fontSize: "1rem",
    },
    noData: {
      textAlign: "center",
      padding: "20px",
      color: "#777",
      fontSize: "1.1rem",
    },
    progressBar: {
      marginTop: "10px",
      height: "5px",
      backgroundColor: "#e0e2ff",
      borderRadius: "5px",
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#4a4de8"
    },
    branchStatus: {
      fontSize: "0.9rem",
      marginTop: "5px",
      color: "#555"
    },
    statusApproved: {
      color: "#2ed573",
      fontWeight: "600"
    },
    statusDenied: {
      color: "#ff4757",
      fontWeight: "600"
    },
    statusPending: {
      color: "#ffa502",
      fontWeight: "600"
    },
    searchResultsInfo: {
      marginBottom: "15px",
      color: "#777",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    "@media (max-width: 992px)": {
      header: {
        fontSize: "2rem",
      },
      sectionTitle: {
        fontSize: "1.4rem",
      },
      statCard: {
        minWidth: "150px",
      },
      statValue: {
        fontSize: "2rem",
      },
    },
    "@media (max-width: 768px)": {
      adminDashboard: {
        padding: "15px",
      },
      headerContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      header: {
        fontSize: "1.8rem",
      },
      searchContainer: {
        width: "100%",
      },
      searchInput: {
        minWidth: "100%",
      },
      tabButton: {
        padding: "10px 20px",
        fontSize: "0.85rem",
      },
      sectionTitle: {
        fontSize: "1.3rem",
      },
      tableHeader: {
        padding: "12px",
        fontSize: "0.85rem",
      },
      tableCell: {
        padding: "12px",
        fontSize: "0.8rem",
      },
      button: {
        padding: "7px 12px",
        fontSize: "0.8rem",
      },
      modalContent: {
        padding: "20px",
      },
      statCard: {
        minWidth: "120px",
        padding: "15px",
      },
      statValue: {
        fontSize: "1.8rem",
      },
    },
    "@media (max-width: 576px)": {
      header: {
        fontSize: "1.5rem",
      },
      tabsContainer: {
        flexDirection: "column",
        alignItems: "center",
      },
      tabButton: {
        width: "100%",
        maxWidth: "300px",
      },
      tableHeader: {
        padding: "10px",
        fontSize: "0.8rem",
      },
      tableCell: {
        padding: "10px",
        fontSize: "0.75rem",
      },
      button: {
        padding: "6px 10px",
        fontSize: "0.75rem",
        marginBottom: "5px",
      },
      buttonGroup: {
        flexDirection: "column",
      },
      detailItem: {
        flexDirection: "column",
      },
      detailLabel: {
        minWidth: "100%",
        marginBottom: "5px",
      },
      statCard: {
        width: "100%",
      },
    },
  };

  // Get current result count based on active tab
  const getCurrentResultCount = () => {
    switch (activeTab) {
      case "admissions":
        return filteredAdmissions.length;
      case "loginRequests":
        return filteredLoginRequests.length;
      case "students":
        return filteredStudents.length;
      default:
        return 0;
    }
  };

  return (
    <div>
      <Header />
      <br></br><br></br><br></br>
      <div style={styles.adminDashboard}>
        <div style={styles.headerContainer}>
          <h2 style={styles.header}>Admin Dashboard</h2>
          <div style={styles.searchContainer}>
            <div style={styles.searchWrapper}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={styles.searchIcon}
              >
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={styles.searchInput}
              />
            </div>
            <button 
              style={{...styles.refreshButton}} 
              onClick={handleRefresh}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 4V10H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 20V14H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.51 9C4.01717 7.56678 4.87913 6.2854 6.01547 5.27542C7.1518 4.26543 8.52547 3.55976 10 3.22452C11.4745 2.88928 12.995 2.9332 14.44 3.35227C15.885 3.77133 17.2055 4.55208 18.27 5.62L23 10M1 14L5.73 18.38C6.79452 19.4479 8.11498 20.2287 9.55996 20.6477C11.0049 21.0668 12.5255 21.1107 14 20.7755C15.4745 20.4402 16.8482 19.7346 17.9845 18.7246C19.1209 17.7146 19.9828 16.4332 20.49 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>
            <button 
              style={{...styles.logoutButton}} 
              onClick={handleLogout}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Branch Statistics Section */}
        <div style={styles.tabContent}>
          <h3 style={styles.sectionTitle}>Branch Seat Status</h3>
          <div style={styles.statsContainer}>
            {allBranches.map(branch => {
              const stats = branchStats[branch.name] || {};
              const percentageFilled = Math.round((stats.admitted || 0) / branch.seats * 100);
              const percentageActive = Math.round((stats.active || 0) / branch.seats * 100);
              
              return (
                <div key={branch.name} style={styles.statCard}>
                  <div style={{...styles.statLabel, fontSize: '1.1rem', marginBottom: '5px', fontWeight: '600'}}>
                    {branch.name}
                  </div>
                  <div style={{...styles.statValue, fontSize: '1.8rem'}}>
                    <span style={{color: stats.remaining > 0 ? '#2ed573' : '#ff4757'}}>
                      {stats.remaining || branch.seats}
                    </span> / {branch.seats}
                  </div>
                  <div style={styles.branchStatus}>
                    {stats.remaining > 0 ? 'Seats Available' : 'Branch Full'}
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${percentageFilled}%`,
                        background: percentageFilled > 80 ? 
                          '#ff4757' : percentageFilled > 50 ? 
                          '#ffa502' : '#4a4de8'
                      }}
                    ></div>
                  </div>
                  <div style={styles.branchStatus}>
                    {stats.admitted || 0} admitted ({percentageFilled}%)
                  </div>
                  <div style={styles.branchStatus}>
                     Active 
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Admissions</div>
            <div style={styles.statValue}>{admissions.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Pending Logins</div>
            <div style={styles.statValue}>{loginRequests.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Active Students</div>
            <div style={styles.statValue}>
              {students.filter(s => s.status === 'approved').length}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={styles.tabsContainer}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "admissions" && styles.activeTab),
            }}
            onClick={() => setActiveTab("admissions")}
          >
            Admissions
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "loginRequests" && styles.activeTab),
            }}
            onClick={() => setActiveTab("loginRequests")}
          >
            Login Requests
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "students" && styles.activeTab),
            }}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
        </div>

        {loading && (
          <div style={styles.loading}>
            <div style={styles.loadingSpinner}></div>
            Loading data...
          </div>
        )}
        {error && <div style={styles.error}>{error}</div>}

        {/* Search Results Info */}
        {searchTerm && (
          <div style={styles.searchResultsInfo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Showing {getCurrentResultCount()} results for "{searchTerm}"
          </div>
        )}

        {/* Admissions Section */}
        {activeTab === "admissions" && (
          <div style={styles.tabContent}>
            <h3 style={styles.sectionTitle}>Admissions Data</h3>
            {filteredAdmissions.length === 0 ? (
              <div style={styles.noData}>
                {searchTerm ? "No matching admissions found" : "No admissions data available"}
              </div>
            ) : (
              <div style={styles.responsiveTable}>
                <table style={styles.table}>
                  <thead style={styles.tableHead}>
                    <tr>
                      <th style={styles.tableHeader}>ID</th>
                      <th style={styles.tableHeader}>Name</th>
                      <th style={styles.tableHeader}>Email</th>
                      <th style={styles.tableHeader}>Mobile</th>
                      <th style={styles.tableHeader}>Branch</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmissions.map((admission) => (
                      <tr key={admission.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{admission.id}</td>
                        <td style={styles.tableCell}>{admission.name}</td>
                        <td style={styles.tableCell}>{admission.email}</td>
                        <td style={styles.tableCell}>{admission.mobile}</td>
                        <td style={styles.tableCell}>{admission.admittedBranch}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.buttonGroup}>
                            <button
                              style={{ ...styles.button, ...styles.viewButton }}
                              onClick={() => handleViewAdmission(admission)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5C5.63636 5 1 12 1 12C1 12 5.63636 19 12 19C18.3636 19 23 12 23 12C23 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              View
                            </button>
                            <button
                              style={{ ...styles.button, ...styles.deleteButton }}
                              onClick={() => handleDeleteAdmission(admission.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

       {/* Login Requests Section */}
{activeTab === "loginRequests" && (
  <div style={styles.tabContent}>
    <h3 style={styles.sectionTitle}>Student Login Requests</h3>
    {filteredLoginRequests.length === 0 ? (
      <div style={styles.noData}>
        {searchTerm ? "No matching login requests found" : "No login requests found"}
      </div>
    ) : (
      <div style={styles.responsiveTable}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>DEN Number</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Password</th> {/* New column */}
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoginRequests.map((login) => (
              <tr key={login.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{login.id}</td>
                <td style={styles.tableCell}>{login.name}</td>
                <td style={styles.tableCell}>{login.denNumber}</td>
                <td style={styles.tableCell}>{login.email}</td>
                <td style={styles.tableCell}>
                  {login.password ? "••••••••" : "Not set"} {/* Masked password */}
                </td>
                <td style={{
                  ...styles.tableCell,
                  ...(login.status === 'approved' ? styles.statusApproved : 
                      login.status === 'denied' ? styles.statusDenied : styles.statusPending)
                }}>
                  {login.status || 'pending'}
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.buttonGroup}>
                    {(!login.status || login.status === 'pending') && (
                      <>
                        <button
                          style={{ ...styles.button, ...styles.approveButton }}
                          onClick={() => handleApproveLogin(login.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Approve
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.denyButton }}
                          onClick={() => handleDenyLogin(login.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Deny
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.viewButton }}
                          onClick={() => alert(`Password: ${login.password || 'Not available'}`)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5C5.63636 5 1 12 1 12C1 12 5.63636 19 12 19C18.3636 19 23 12 23 12C23 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View Pass
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

           {/* Student Login Data Section */}
{activeTab === "students" && (
  <div style={styles.tabContent}>
    <h3 style={styles.sectionTitle}>Student Login Data</h3>
    {filteredStudents.length === 0 ? (
      <div style={styles.noData}>
        {searchTerm ? "No matching students found" : "No student login data available"}
      </div>
    ) : (
      <div style={styles.responsiveTable}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>DEN Number</th>
              <th style={styles.tableHeader}>Email</th>
              {/* Removed Branch column header */}
              <th style={styles.tableHeader}>Password</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{student.id}</td>
                <td style={styles.tableCell}>{student.name}</td>
                <td style={styles.tableCell}>{student.denNumber}</td>
                <td style={styles.tableCell}>{student.email}</td>
                {/* Removed Branch column data cell */}
                <td style={styles.tableCell}>
                  {student.password ? "••••••••" : "Not set"}
                </td>
                <td style={{
                  ...styles.tableCell,
                  ...(student.status === 'approved' ? styles.statusApproved : 
                      student.status === 'denied' ? styles.statusDenied : styles.statusPending)
                }}>
                  {student.status || 'pending'}
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.buttonGroup}>
                    <button
                      style={{ ...styles.button, ...styles.viewButton }}
                      onClick={() => alert(`Password: ${student.password || 'Not available'}`)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C5.63636 5 1 12 1 12C1 12 5.63636 19 12 19C18.3636 19 23 12 23 12C23 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View Pass
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.deleteButton }}
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

        {/* Modal for Viewing Full Admission Details */}
        {selectedAdmission && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <span style={styles.closeButton} onClick={closeModal}>
                &times;
              </span>
              <h3 style={styles.modalTitle}>Admission Details</h3>

              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>ID:</span>
                <span style={styles.detailValue}>{selectedAdmission.id}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Name:</span>
                <span style={styles.detailValue}>{selectedAdmission.name}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Email:</span>
                <span style={styles.detailValue}>{selectedAdmission.email}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Mobile:</span>
                <span style={styles.detailValue}>{selectedAdmission.mobile}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Branch:</span>
                <span style={styles.detailValue}>{selectedAdmission.admittedBranch}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Father's Name:</span>
                <span style={styles.detailValue}>{selectedAdmission.fatherName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Mother's Name:</span>
                <span style={styles.detailValue}>{selectedAdmission.motherName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Address:</span>
                <span style={styles.detailValue}>{selectedAdmission.currentAddress}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Permanent Address:</span>
                <span style={styles.detailValue}>{selectedAdmission.permanentAddress}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Local Guardian:</span>
                <span style={styles.detailValue}>{selectedAdmission.localGuardian}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Nationality:</span>
                <span style={styles.detailValue}>{selectedAdmission.nationality}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Caste:</span>
                <span style={styles.detailValue}>{selectedAdmission.caste}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Gender:</span>
                <span style={styles.detailValue}>{selectedAdmission.gender}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Date of Birth:</span>
                <span style={styles.detailValue}>{selectedAdmission.dob}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Occupation:</span>
                <span style={styles.detailValue}>{selectedAdmission.occupation}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>WhatsApp Number:</span>
                <span style={styles.detailValue}>{selectedAdmission.whatsapp}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Aadhar Number:</span>
                <span style={styles.detailValue}>{selectedAdmission.aadharNumber}</span>
              </div>

              {/* Documents Section */}
              <h4 style={{ ...styles.sectionTitle, fontSize: "1.3rem", margin: "25px 0 15px 0" }}>Documents</h4>
              {selectedAdmission.documents && (
                <>
                  {Object.entries(selectedAdmission.documents).map(([key, value]) => (
                    value && (
                      <div key={key} style={styles.detailItem}>
                        <span style={styles.detailLabel}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <a
                          href={`http://localhost:5000/${value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.documentLink}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View Document
                        </a>
                      </div>
                    )
                  ))}
                </>
              )}

              {/* Payment Details */}
              <h4 style={{ ...styles.sectionTitle, fontSize: "1.3rem", margin: "25px 0 15px 0" }}>Payment Details</h4>
              {selectedAdmission.payments && (
                <>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Amount Paid:</span>
                    <span style={styles.detailValue}>₹{selectedAdmission.payments.amount}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>DD Number:</span>
                    <span style={styles.detailValue}>{selectedAdmission.payments.ddNumber}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Payment Date:</span>
                    <span style={styles.detailValue}>{selectedAdmission.payments.date}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Receipt Number:</span>
                    <span style={styles.detailValue}>{selectedAdmission.payments.receiptNumber}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>UTR Number:</span>
                    <span style={styles.detailValue}>{selectedAdmission.payments.utrNumber}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Sender UPI ID:</span>
                    <span style={styles.detailValue}>{selectedAdmission.payments.senderUpiId}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Receiver UPI ID:</span>
                    <span style={styles.detailValue}>{selectedAdmission.payments.receiverUpiId}</span>
                  </div>
                  {selectedAdmission.payments.utrPaymentSlip && (
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>UTR Payment Slip:</span>
                      <a
                        href={`http://localhost:5000/${selectedAdmission.payments.utrPaymentSlip}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.documentLink}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View Slip
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default Admin;