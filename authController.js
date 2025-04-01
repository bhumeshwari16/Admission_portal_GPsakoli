const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const signupStudent = async (req, res) => {
    const { name, denNumber, email, password } = req.body;
    console.log('Received signup request:', { name, denNumber, email, password });

    try {
        console.log('Checking for existing student with email or DEN number:', email, denNumber);
        const [existingStudents] = await pool.execute(
            'SELECT * FROM students WHERE email = ? OR denNumber = ?',
            [email, denNumber]
        );
        console.log('Existing student check result:', existingStudents);

        if (existingStudents.length > 0) {
            return res.status(400).json({ message: 'Student with this email or DEN number already exists' });
        }

        const insertQuery = 'INSERT INTO students (name, denNumber, email, password) VALUES (?, ?, ?, ?)';
        const insertValues = [name, denNumber, email, password]; // Using plain password
        console.log('Executing SQL:', insertQuery, insertValues);

        const [result] = await pool.execute(insertQuery, insertValues);
        console.log('Database insert result:', result);

        res.status(201).json({ message: 'Student registered successfully' });

    } catch (error) {
        console.error('Error during student signup:', error); // Log the full error object
        res.status(500).json({ message: 'Could not register student. Please try again later.' });
    }
};

const loginStudent = async (req, res) => {
    const { denNumber, email, password } = req.body;

    try {
        const [students] = await pool.execute(
            'SELECT * FROM students WHERE denNumber = ? AND email = ?',
            [denNumber, email]
        );

        if (students.length === 0) {
            return res.status(401).json({ message: 'Invalid DEN number or Email' });
        }

        const student = students[0];

        // Check if status is "approved"
        if (student.status !== "approved") {
            return res.status(403).json({ message: 'Your account is pending approval from admin' });
        }

        // Compare the plain password directly
        if (password === student.password) {
            return res.json({ message: 'Login successful', name: student.name });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }

    } catch (error) {
        console.error('Error during student login:', error);
        res.status(500).json({ message: 'Login failed. Please try again later.' });
    }
};

module.exports = { signupStudent, loginStudent };
