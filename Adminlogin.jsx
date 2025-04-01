import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
// import './styles.css'; // Remove external CSS import

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic client-side validation
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        // Replace with your actual API endpoint for admin login
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token or admin status in local storage or state
                localStorage.setItem('isAdmin', 'true'); // Or store a JWT token
                // Redirect to the admin dashboard
                window.location.href = '/Admin'; // Replace with your dashboard route
            } else {
                setError(data.message || 'Invalid username or password.');
            }
        } catch (err) {
            setError('Could not connect to the server. Please try again later.');
            console.error('Admin login error:', err);
        }
    };

    return (
        <div className="admin-login-page">
            <Header />
            <div className="admin-login-container">
                <div className="admin-login-box">
                    <h2 className="admin-login-title">Admin Login</h2>
                    <form className="admin-login-form" onSubmit={handleLogin}>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="admin-login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <div className="admin-login-password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="admin-login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="admin-login-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '🙈'}
                            </span>
                        </div>
                        <button type="submit" className="admin-login-button">Login</button>
                    </form>
                    <p className="admin-signup-link">
                        New Admin? <Link to="/Adminsignup">Create an Account</Link>
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

                .admin-login-page {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    background-color: #f4f4f4;
                    font-family: sans-serif;
                }

                .admin-login-container {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background-color: #f8f9fa; /* White background */
                }

                .admin-login-box {
                    background-color: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    width: 95%; /* Adjust width for responsiveness */
                    max-width: 400px; /* Maximum width */
                    text-align: center;
                    animation: fadeIn 0.5s ease-in-out;
                }

                .admin-login-title {
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

                .admin-login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .admin-login-input {
                    padding: 14px;
                    border: 1px solid #ced4da;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }

                .admin-login-input:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                }

                .admin-login-password-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .admin-login-password-toggle {
                    position: absolute;
                    right: 12px;
                    cursor: pointer;
                    font-size: 20px;
                    color: #6c757d;
                }

                .admin-login-button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 8px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .admin-login-button:hover {
                    background-color: #0056b3;
                }

                .admin-signup-link {
                    margin-top: 20px;
                    font-size: 16px;
                    color: #6c757d;
                    text-align: center;
                }

                .admin-signup-link a {
                    color: #007bff;
                    cursor: pointer;
                    font-weight: bold;
                    transition: color 0.3s ease;
                    text-decoration: none;
                }

                .admin-signup-link a:hover {
                    color: #0056b3;
                    text-decoration: underline;
                }

                /* Responsive Styles */
                @media (max-width: 576px) {
                    .admin-login-box {
                        padding: 25px;
                    }

                    .admin-login-title {
                        font-size: 24px;
                    }

                    .admin-login-input {
                        padding: 12px;
                        font-size: 15px;
                    }

                    .admin-login-button {
                        font-size: 16px;
                    }

                    .admin-signup-link {
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

export default AdminLogin;