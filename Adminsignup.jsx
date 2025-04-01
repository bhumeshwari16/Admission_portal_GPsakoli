import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
// import './styles.css'; // Remove external CSS import

const AdminSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Basic client-side validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Email format validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Replace with your actual API endpoint for signup
        try {
            const response = await fetch('http://localhost:5000/api/admin/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }), // Sending name, email, and password
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Signup successful! Please login.');
                setTimeout(() => {
                    navigate('/Adminlogin');
                }, 2000);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('Could not connect to the server. Please try again later.');
            console.error('Admin signup error:', err);
        }
    };

    return (
        <div className="admin-signup-page">
            <Header />
            <div className="admin-signup-container">
                <div className="admin-signup-box">
                    <h2 className="admin-signup-title">Admin Sign Up</h2>
                    <form className="admin-signup-form" onSubmit={handleSignup}>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="admin-signup-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="admin-signup-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="admin-signup-password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="admin-signup-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="admin-signup-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '🙈'}
                            </span>
                        </div>
                        <div className="admin-signup-password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="admin-signup-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span
                                className="admin-signup-password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? '👁️' : '🙈'}
                            </span>
                        </div>
                        <button type="submit" className="admin-signup-button">Sign Up</button>
                    </form>
                    <p className="admin-login-link">
                        Already have an account? <Link to="/Adminlogin">Log in</Link>
                    </p>
                </div>
            </div>
            <Footer />
            <style jsx>{`
                /* Reset and Box Sizing */
                *, *::before, *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f8f9fa; /* Light background */
                    color: #333;
                    line-height: 1.6;
                }

                .admin-signup-page {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    background-color: #f4f4f4;
                    font-family: sans-serif;
                }

                .admin-signup-container {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background-color: #f8f9fa; /* White background */
                }

                .admin-signup-box {
                    background-color: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    width: 95%; /* Adjust width for responsiveness */
                    max-width: 400px; /* Maximum width */
                    text-align: center;
                    animation: fadeIn 0.5s ease-in-out;
                }

                .admin-signup-title {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #343a40; /* Darker text */
                }

                .error-message {
                    color: red;
                    margin-bottom: 15px;
                    text-align: center;
                }

                .success-message {
                    color: green;
                    margin-bottom: 15px;
                    text-align: center;
                }

                .admin-signup-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .admin-signup-input {
                    padding: 14px;
                    border: 1px solid #ced4da;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }

                .admin-signup-input:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                }

                .admin-signup-password-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .admin-signup-password-toggle {
                    position: absolute;
                    right: 12px;
                    cursor: pointer;
                    font-size: 20px;
                    color: #6c757d;
                }

                .admin-signup-button {
                    background-color: #28a745; /* Green color for signup */
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 8px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .admin-signup-button:hover {
                    background-color: #1e7e34;
                }

                .admin-login-link {
                    margin-top: 20px;
                    font-size: 16px;
                    color: #6c757d;
                    text-align: center;
                }

                .admin-login-link a {
                    color: #007bff;
                    cursor: pointer;
                    font-weight: bold;
                    transition: color 0.3s ease;
                    text-decoration: none;
                }

                .admin-login-link a:hover {
                    color: #0056b3;
                    text-decoration: underline;
                }

                /* Responsive Styles */
                @media (max-width: 576px) {
                    .admin-signup-box {
                        padding: 25px;
                    }

                    .admin-signup-title {
                        font-size: 24px;
                    }

                    .admin-signup-input {
                        padding: 12px;
                        font-size: 15px;
                    }

                    .admin-signup-button {
                        font-size: 16px;
                    }

                    .admin-login-link {
                        font-size: 15px;
                    }
                }

                /* Animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminSignup;