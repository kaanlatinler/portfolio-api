const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models'); // Adjust path as needed
const {secret} = require('../cfg/cfg').jwt;

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validate input
    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required' });
    }

    // Find user by name
    const user = await Users.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, name: user.name },
      secret,
      { expiresIn: '24h' }
    );

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};
