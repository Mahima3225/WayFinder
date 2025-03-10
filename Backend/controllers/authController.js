// backend/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if the user already exists
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Insert the new user into the database
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hash]
    );
    
    // Create a JWT token
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    
    // Generate JWT token upon successful login
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
