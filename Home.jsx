import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
  // State for notice board animation
  const [currentNotice, setCurrentNotice] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample notices data
  const notices = [
    "Admission Open for 2025 Batch - Last Date: 30th June",
    "Semester Exam Timetable Released - Check Portal",
    "AI & ML Workshop - Register by 15th May",
    "College Annual Day Celebration on 10th April",
    "Campus Recruitment Drive by Tech Mahindra on 25th May"
  ];

  // Hero section slideshow images
  const heroImages = [
    "images/he1.jpg",
    "images/he2.jpg",
    "images/he3.jpg",
    "images/he4.jpeg"
  ];

  // Auto-scroll effects
  useEffect(() => {
    const noticeInterval = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 3000);
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => {
      clearInterval(noticeInterval);
      clearInterval(slideInterval);
    };
  }, [notices.length, heroImages.length]);

  // Recruiters logos
  const recruiters = [
    { name: "TCS", logo: "images/brands/TCS.png" },
    { name: "Infosys", logo: "images/brands/infosys.png" },
    { name: "Wipro", logo: "images/brands/wipro.png" },
    { name: "Tech Mahindra", logo: "images/brands/mahindra.png" },
    { name: "L&T", logo: "images/brands/L&T.png" },
    { name: "bajaj", logo: "images/brands/bajaj.png" },
    { name: "Kirloskar", logo: "images/brands/kirloskar.png" }
  ];

  // Faculty data
  const faculty = [
    { name: "Mr. A.A. Bajpayee", position: "Lecturer, Computer Tech.", image: "images/staff-imgs/computer/aabajpayee.jpeg" },
    { name: "Mr. S.P. Lambhade", position: "Principal, Computer Tech.", image: "images/staff-imgs/computer/gpprincipal.jpeg" },
    { name: "Mr. P.B. Lahoti", position: "Lecturer, Computer Tech.", image: "images/staff-imgs/computer/lahoti.jpeg" },
    { name: "Mr. M.A. Rahman", position: "HOD, Computer Tech.", image: "images/staff-imgs/computer/Rahman.png" }
  ];


  

  // Gallery images
  const galleryImages = [
    { src: "images/college-images/nine.jpg", alt: "College Campus" },
    { src: "images/college-images/five.jpg", alt: "Library" },
    { src: "images/college-images/seven.jpg", alt: "Lab Facility" },
    { src: "images/college-images/state level.jpg", alt: "Sports Event" },
    { src: "images/college-images/one.jpg", alt: "Cultural Event" },
    { src: "images/college-images/two.jpg", alt: "Workshop" }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The faculty and facilities at GPSakoli helped me secure a job at TCS right after diploma.",
      author: "Bhumeshwari S. Doye ",
      department: "Computer Science"
    },
    {
      quote: "Industry-oriented curriculum gave me an edge. Now pursuing degree from IIT Bombay.",
      author: "Bhumeshwari S. Doye ",
      department: "Computer Science"
    },
    {
      quote: "Active placement cell helped me get placed in L&T with good package.",
      author: "Bhumeshwari S. Doye ",
      department: "Computer Science"
    }
  ];

  // Styles
  const styles = {
    homeContainer: {
      fontFamily: "'Poppins', sans-serif",
      color: "#2d3748",
      lineHeight: 1.6,
      backgroundColor: "#f7fafc",
      width: "100%",
      overflowX: "hidden",
    },
    
    // Hero Section
    heroSection: {
      position: "relative",
      height: "70vh",
      minHeight: "500px",
      overflow: "hidden",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, rgba(7,77,2,0.1), rgba(1,79,2,0.1))",
      zIndex: 1,
    },
    heroImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "opacity 1.5s ease",
      opacity: 0,
    },
    activeHeroImage: {
      opacity: 1,
    },
    welcomeSection: {
      position: "relative",
      zIndex: 2,
      maxWidth: "800px",
      padding: "0 20px",
      width: "100%",
    },
    heroTitle: {
      fontSize: "2.8rem",
      marginBottom: "20px",
      color: "white",
    },
    heroText: {
      fontSize: "1.1rem",
      marginBottom: "30px",
      textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
    },
    applyButton: {
      display: "inline-block",
      backgroundColor: "#ffff",
      color: "#4a4de8",
      padding: "12px 30px",
      borderRadius: "50px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "1.1rem",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 20px rgba(39, 53, 247, 0.2)",
      },
    },
    heroDots: {
      position: "absolute",
      bottom: "3px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      zIndex: 2,
    },
    heroDot: {
      width: "9px",
      height: "9px",
      borderRadius: "50%",
      backgroundColor: "rgba(185, 182, 196, 0.5)",
      margin: "0 5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeHeroDot: {
      backgroundColor: "white",
      transform: "scale(1.2)",
    },

    // Common Section Styles
    section: {
      padding: "80px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
      boxSizing: "border-box",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "2.3rem",
      marginBottom: "50px",
      color: "#2d3748",
      position: "relative",
      "&:after": {
        content: '""',
        display: "block",
        width: "80px",
        height: "4px",
        background: "linear-gradient(90deg, #667eea, #5a67d8)",
        margin: "20px auto 0",
        borderRadius: "2px",
      },
    },

    // Notice Board
    noticeBoard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 10px 25px rgba(101, 119, 234, 0.1)",
      position: "relative",
      overflow: "hidden",
      borderLeft: "5px solid #667eea",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      width: "100%",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 15px 35px rgba(101, 119, 234, 0.15)",
      }
    },
    noticeHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    noticeIcon: {
      fontSize: "2rem",
      marginRight: "15px",
      color: "#667eea",
    },
    noticeTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      color: "#2d3748",
    },
    noticeItemContainer: {
      position: "relative",
      height: "70px",
      overflow: "hidden",
      width: "100%",
    },
    noticeItem: {
      padding: "15px 0",
      fontSize: "1.15rem",
      display: "flex",
      alignItems: "center",
      position: "absolute",
      width: "calc(100% - 50px)",
      left: "25px",
      top: "50%",
      transform: "translateY(-50%)",
      opacity: 0,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:before": {
        content: '"▹"',
        marginRight: "12px",
        color: "#667eea",
        fontSize: "1.5rem",
      },
      "&.active": {
        opacity: 1,
      },
    },
    viewAllButton: {
      display: "inline-block",
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#ebf4ff",
      color: "#5a67d8",
      borderRadius: "8px",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      float: "right",
      "&:hover": {
        backgroundColor: "#5a67d8",
        color: "white",
        transform: "translateY(-2px)",
      },
    },

    // Recruiters Section
    recruiterSection: {
      backgroundColor: "#f6f9ff",
      padding: "70px 0",
      overflow: "hidden",
      position: "relative",
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
    },
    marqueeWrapper: {
      position: "relative",
      width: "100%",
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: 0,
        width: "100px",
        height: "100%",
        zIndex: 2,
      },
      "&:before": {
        left: 0,
        background: "linear-gradient(to right, #f6f9ff, transparent)",
      },
      "&:after": {
        right: 0,
        background: "linear-gradient(to left, #f6f9ff, transparent)",
      },
    },
    marqueeContainer: {
      display: "flex",
      animation: "scroll 25s linear infinite",
      width: "calc(200px * 14)",
    },
    recruiterLogo: {
      height: "60px",
      width: "auto",
      margin: "0 40px",
      objectFit: "contain",
      filter: "grayscale(100%)",
      opacity: 0.7,
      transition: "all 0.3s ease",
      "&:hover": {
        filter: "grayscale(0%)",
        opacity: 1,
        transform: "scale(1.1)",
      },
    },

    // Faculty Section
    facultySection: {
      backgroundColor: "#ffffff",
    },
    facultyList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "30px",
      marginTop: "40px",
      width: "100%",
    },
    facultyCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(101, 119, 234, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      textAlign: "center",
      paddingBottom: "25px",
      position: "relative",
      width: "100%",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 15px 35px rgba(101, 119, 234, 0.15)",
      },
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "5px",
        background: "linear-gradient(90deg, #667eea, #5a67d8)",
      },
    },
    facultyImageContainer: {
      width: "160px",
      height: "160px",
      borderRadius: "50%",
      overflow: "hidden",
      margin: "30px auto 25px",
      border: "5px solid #ebf4ff",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: "transform 0.4s ease",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    facultyImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    facultyInfo: {
      padding: "0 25px",
    },
    facultyName: {
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "8px",
      color: "#2d3748",
    },
    facultyPosition: {
      fontSize: "0.95rem",
      color: "#718096",
      lineHeight: 1.5,
    },

    // Gallery Section
    gallerySection: {
      backgroundColor: "#f6f9ff",
    },
    galleryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gridAutoRows: "200px",
      gap: "20px",
      marginTop: "40px",
      width: "100%",
    },
    galleryItem: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(101, 119, 234, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      width: "100%",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 15px 35px rgba(101, 119, 234, 0.15)",
      },
      "&:nth-child(3n+1)": {
        gridRow: "span 2",
      },
    },
    galleryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    galleryCaption: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      background: "linear-gradient(transparent, rgba(42, 67, 101, 0.8))",
      color: "white",
      padding: "20px",
      transform: "translateY(100%)",
      transition: "transform 0.3s ease",
    },
    galleryItemHover: {
      "&:hover $galleryCaption": {
        transform: "translateY(0)",
      },
      "&:hover $galleryImage": {
        transform: "scale(1.1)",
      },
    },

    // Video Section
    demoSection: {
      backgroundColor: "#ffffff",
    },
    videoContainer: {
      position: "relative",
      width: "100%",
      maxWidth: "800px",
      margin: "40px auto 0",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 15px 35px rgba(101, 119, 234, 0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 20px 40px rgba(101, 119, 234, 0.15)",
      },
    },
    iframe: {
      width: "100%",
      height: "450px",
      border: "none",
      display: "block",
    },

    // Stats Section
    statsSection: {
      background: "linear-gradient(135deg, #667eea, #5a67d8)",
      color: "white",
      padding: "80px 20px",
      width: "100%",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "40px",
      textAlign: "center",
      width: "100%",
    },
    statItem: {
      padding: "30px",
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: "12px",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        backgroundColor: "rgba(255,255,255,0.2)",
      },
    },
    statNumber: {
      fontSize: "3rem",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(90deg, #ffffff, #e6f0ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    statLabel: {
      fontSize: "1.2rem",
      opacity: 0.9,
      fontWeight: "500",
    },

    // Testimonials
    testimonialSection: {
      backgroundColor: "#f6f9ff",
    },
    testimonialGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "30px",
      marginTop: "40px",
      width: "100%",
    },
    testimonialCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "35px",
      boxShadow: "0 10px 25px rgba(101, 119, 234, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      width: "100%",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 15px 35px rgba(101, 119, 234, 0.15)",
      },
      "&:before": {
        content: '"“"',
        position: "absolute",
        top: "20px",
        left: "25px",
        fontSize: "5rem",
        color: "rgba(101, 119, 234, 0.1)",
        fontFamily: "serif",
        lineHeight: "1",
        zIndex: 0,
      },
    },
    testimonialContent: {
      position: "relative",
      zIndex: 1,
    },
    testimonialQuote: {
      fontStyle: "italic",
      fontSize: "1.1rem",
      marginBottom: "25px",
      color: "#4a5568",
      lineHeight: 1.7,
    },
    testimonialAuthor: {
      fontWeight: "700",
      color: "#5a67d8",
      fontSize: "1.1rem",
      marginBottom: "5px",
    },
    testimonialDepartment: {
      color: "#718096",
      fontSize: "0.9rem",
    },

    // Responsive Styles
    "@media (max-width: 992px)": {
      sectionTitle: {
        fontSize: "2rem",
      },
      facultyList: {
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      },
      galleryGrid: {
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      },
    },
    "@media (max-width: 768px)": {
      section: {
        padding: "60px 15px",
      },
      sectionTitle: {
        fontSize: "1.8rem",
        marginBottom: "40px",
      },
      noticeBoard: {
        padding: "25px",
      },
      facultyList: {
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      },
      statsGrid: {
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "25px",
      },
      testimonialGrid: {
        gridTemplateColumns: "1fr",
      },
      iframe: {
        height: "350px",
      },
      heroTitle: {
        fontSize: "2.2rem",
      },
    },
    "@media (max-width: 576px)": {
      section: {
        padding: "50px 10px",
      },
      sectionTitle: {
        fontSize: "1.6rem",
      },
      statsGrid: {
        gridTemplateColumns: "1fr 1fr",
      },
      galleryGrid: {
        gridAutoRows: "180px",
      },
      galleryItem: {
        "&:nth-child(3n+1)": {
          gridRow: "span 1",
        },
      },
      heroTitle: {
        fontSize: "1.8rem",
      },
      heroText: {
        fontSize: "1rem",
      },
    },
  };

  return (
    <div style={styles.homeContainer}>
      <Header />

      

     {/* Hero Section */}
<section style={styles.heroSection}>
  {heroImages.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Hero Slide ${index + 1}`}
      style={{
        ...styles.heroImage,
        ...(index === currentSlide && styles.activeHeroImage)
      }}
    />
  ))}
  <div style={styles.heroOverlay}></div>
  <div style={styles.welcomeSection}>
    <h1 style={styles.heroTitle}>Welcome to Government Polytechnic Sakoli</h1>
    <p style={styles.heroText}>
      Government Polytechnic Sakoli.
    </p>
    <Link to="/Signup" style={styles.applyButton}>Apply Now</Link>
  </div>
  <div style={styles.heroDots}>
    {heroImages.map((_, index) => (
      <div
        key={index}
        style={{
          ...styles.heroDot,
          ...(index === currentSlide && styles.activeHeroDot)
        }}
        onClick={() => setCurrentSlide(index)}
      ></div>
    ))}
  </div>
</section>

{/* News Ticker Section - Centered between hero and gallery */}
<section style={{
  backgroundColor: "#1e40af",
  padding: "10px 0",
  borderTop: "2px solid #fbbf24",
  borderBottom: "2px solid #fbbf24",
  overflow: "hidden",
  marginTop: "40px", // Add top margin

}}>
  <div style={{
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    padding: "0 20px",
    maxWidth: "1100px"
  }}>
    <div style={{
      backgroundColor: "#fbbf24",
      color: "#1e293b",
      padding: "6px 12px",
      borderRadius: "4px",
      fontWeight: "700",
      fontSize: "0.85rem",
      whiteSpace: "nowrap",
      marginRight: "15px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      LATEST NEWS
    </div>
    
    <div style={{
      position: "relative",
      flex: 1,
      overflow: "hidden",
      height: "22px"
    }}>
      <div style={{
        display: "flex",
        animation: "scroll 20s linear infinite",
        whiteSpace: "nowrap"
      }}>
        {[...notices, ...notices].map((notice, index) => (
          <div key={index} style={{
            display: "inline-flex",
            alignItems: "center",
            paddingRight: "30px",
            color: "white",
            fontSize: "0.9rem"
          }}>
            <span style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              backgroundColor: "#fbbf24",
              borderRadius: "50%",
              marginRight: "10px"
            }}></span>
            {notice}
          </div>
        ))}
      </div>
      
      {/* Gradient fade effects */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "400px",
        height: "100%",
        background: "linear-gradient(90deg,rgb(149, 153, 165), transparent)"
      }}></div>
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "400px",
        height: "100%",
        background: "linear-gradient(270deg,rgb(200, 205, 221), transparent)"
      }}></div>
    </div>
  </div>
</section>

{/* Gallery Section with adjusted top spacing */}
<section style={{ 
  ...styles.section, 
  ...styles.gallerySection,
  paddingTop: "40px" // Reduced top padding
}}>
  <h2 style={styles.sectionTitle}>College Gallery</h2>
  <div style={styles.galleryGrid}>
    {galleryImages.map((image, index) => (
      <div key={index} style={{ ...styles.galleryItem, ...styles.galleryItemHover }}>
        <img 
          src={image.src} 
          alt={image.alt} 
          style={styles.galleryImage} 
        />
        <div style={styles.galleryCaption}>
          {image.alt}
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  {`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}
</style>

     {/* Recruiters Section */}
<section style={{ 
  ...styles.section, 
  backgroundColor: "#f8fafc", // Light blue-gray background
  padding: "60px 20px"
}}>
  <h2 style={{
    ...styles.sectionTitle,
    color: "#1e40af", // Dark blue
    "&:after": {
      background: "linear-gradient(90deg, #fbbf24, #f59e0b)" // Yellow gradient
    }
  }}>Our Recruiters</h2>
  <div style={{
    ...styles.marqueeWrapper,
    "&:before": {
      background: "linear-gradient(to right, #f8fafc, transparent)"
    },
    "&:after": {
      background: "linear-gradient(to left, #f8fafc, transparent)"
    }
  }}>
    <div style={styles.marqueeContainer}>
      {[...recruiters, ...recruiters].map((recruiter, index) => (
        <div key={index} style={{
          margin: "0 30px",
          display: "flex",
          alignItems: "center",
          filter: "grayscale(100%)",
          opacity: 0.7,
          transition: "all 0.3s ease",
          "&:hover": {
            filter: "grayscale(0%)",
            opacity: 1,
            transform: "scale(1.1)"
          }
        }}>
          <img
            src={recruiter.logo}
            alt={recruiter.name}
            style={{
              height: "50px",
              width: "auto",
              objectFit: "contain",
             
            }}
          />
        </div>
      ))}
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section style={{ 
  ...styles.section, 
  backgroundColor: "#ffffff", // White background
  padding: "60px 20px"
}}>
  <h2 style={{
    ...styles.sectionTitle,
    color: "#1e40af", // Dark blue
    "&:after": {
      background: "linear-gradient(90deg, #fbbf24, #f59e0b)" // Yellow gradient
    }
  }}>What Our Students Say</h2>
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
    marginTop: "40px"
  }}>
    {testimonials.map((testimonial, index) => (
      <div key={index} style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "25px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderTop: "4px solid #fbbf24", // Yellow accent
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"
        }
      }}>
        <div style={{ position: "relative" }}>
          <p style={{
            fontStyle: "italic",
            fontSize: "1rem",
            marginBottom: "20px",
            color: "#1f2937", // Dark gray (almost black)
            lineHeight: 1.6
          }}>"{testimonial.quote}"</p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#1e40af", // Blue
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem"
            }}>
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <p style={{
                fontWeight: "600",
                color: "#1e40af", // Blue
                fontSize: "1rem",
                marginBottom: "2px"
              }}>{testimonial.author}</p>
              <p style={{
                color: "#6b7280", // Medium gray
                fontSize: "0.85rem"
              }}>({testimonial.department})</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>




     {/* Compact Contact Section */}
<section style={{ 
  backgroundColor: "#f8fafc",
  padding: "40px 15px",
  display: "flex",
  justifyContent: "center"
}}>
  <div style={{
    width: "700px",
    minHeight: "300px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden"
  }}>
    <div style={{
      background: "linear-gradient(135deg, #2563eb, #1e40af)",
      padding: "15px",
      textAlign: "center",
      color: "white"
    }}>
      <h2 style={{
        fontSize: "1.3rem",
        margin: "0",
        fontWeight: "600"
      }}>Contact Us</h2>
      <p style={{
        fontSize: "0.8rem",
        opacity: 0.9,
        margin: "4px 0 0",
      }}>Get in touch</p>
    </div>
    
    <form style={{
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      <div>
        <input 
          type="text" 
          placeholder="Name" 
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            fontSize: "0.8rem",
            backgroundColor: "#f8fafc",
            "&:focus": {
              outline: "none",
              borderColor: "#2563eb",
            }
          }} 
          required 
        />
      </div>
      
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            fontSize: "0.8rem",
            backgroundColor: "#f8fafc",
            "&:focus": {
              outline: "none",
              borderColor: "#2563eb",
            }
          }} 
          required 
        />
      </div>
      
      <div>
        <textarea 
          placeholder="Message" 
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            fontSize: "0.8rem",
            resize: "vertical",
            minHeight: "60px",
            backgroundColor: "#f8fafc",
            "&:focus": {
              outline: "none",
              borderColor: "#2563eb",
            }
          }} 
          required 
        />
      </div>
      
      <button 
        type="submit" 
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "8px",
          border: "none",
          borderRadius: "4px",
          fontSize: "0.9rem",
          fontWeight: "500",
          cursor: "pointer",
          marginTop: "5px",
          "&:hover": {
            backgroundColor: "#1e40af",
          }
        }}
      >
        Send
      </button>
    </form>
  </div>
</section>
    
    
    



      <Footer />

      {/* Global styles for animations */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}

export default Home;