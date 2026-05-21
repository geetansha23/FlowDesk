const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
  REGISTER
*/
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    /*
      CHECK USER
    */
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    /*
      HASH PASSWORD
    */
    const hashedPassword =
      await bcrypt.hash(password, 10);

    /*
      CREATE USER
    */
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error(
      'Register Error:',
      error
    );

    res.status(500).json({
      message: 'Server Error'
    });
  }
};

/*
  LOGIN
*/
exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    /*
      CHECK USER
    */
    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    /*
      CHECK PASSWORD
    */
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    /*
      TOKEN
    */
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(
      'Login Error:',
      error
    );

    res.status(500).json({
      message: 'Server Error'
    });
  }
};