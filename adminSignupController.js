// backend/controllers/adminSignupController.js
const pool = require('../config/db'); // If using MySQL
const bcrypt = require('bcryptjs');

// @desc    Register a new admin
// @route   POST /api/admin/signup
// @access  Public
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received signup request:', { name, email, password });
  
    try {
      console.log('Checking for existing admin with email:', email);
      const [existingAdmin] = await pool.execute('SELECT * FROM admins WHERE username = ?', [email]);
      console.log('Existing admin check result:', existingAdmin);
  
      if (existingAdmin.length > 0) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }
  
      // *** WARNING: Storing plain text password for DEBUGGING ONLY! ***
      console.log('Storing plain text password:', password);
  
      const insertQuery = 'INSERT INTO admins (name, username, password) VALUES (?, ?, ?)';
      const insertValues = [name, email, password]; // Store plain password
      console.log('Executing SQL:', insertQuery, insertValues);
  
      const [result] = await pool.execute(insertQuery, insertValues);
      console.log('Database insert result:', result);
  
      res.status(201).json({ message: 'Admin account created successfully. Please login.' });
  
    } catch (error) {
      console.error('Error registering admin:', error); // Log the full error object
      res.status(500).json({ message: 'Could not create admin account' });
    }
  };

// @desc    Authenticate admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });

  try {
      const [rows] = await pool.execute('SELECT * FROM admins WHERE username = ?', [username]);
      if (rows.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      const admin = rows[0];
      console.log('Stored password in DB:', admin.password);
      console.log('Entered password:', password);

      // Direct comparison without bcrypt (since you're using plain text)
      if (password === admin.password) {
          return res.json({ message: 'Login successful' });
      } else {
          return res.status(401).json({ message: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Error logging in admin:', error);
      res.status(500).json({ message: 'Login failed' });
  }
};



module.exports = { registerAdmin, loginAdmin };