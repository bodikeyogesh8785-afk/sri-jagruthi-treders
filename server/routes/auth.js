const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ username });
    
    // Auto-create admin if it's the first time and credentials match .env
    const envUser = process.env.ADMIN_USERNAME || 'admin';
    const envPass = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!user && username === envUser && password === envPass) {
        console.log('Creating initial admin user...');
        const hashedPassword = await bcrypt.hash(envPass, 10);
        user = new User({
            username: envUser,
            password: hashedPassword,
            role: 'admin'
        });
        await user.save();
    }

    if (!user) {
        return res.status(400).json({ msg: `User "${username}" not found. Ensure you added ADMIN_USERNAME to Render.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       return res.status(400).json({ msg: 'Password mismatch. Check your ADMIN_PASSWORD in Render.' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { username: user.username, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
