const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authMiddleware = require(
  '../middleware/authMiddleware'
);

const router = express.Router();

/*
  GENERATE JWT
*/
const generateToken = (
  user
) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
};

/*
  REGISTER
*/
router.post(
  '/register',
  async (req, res) => {
    try {

      const {
        name,
        email,
        password,
        role
      } = req.body;

      /*
        CHECK EXISTING USER
      */
      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              'User already exists'
          });

      }

      /*
        HASH PASSWORD
      */
      const salt =
        await bcrypt.genSalt(
          10
        );

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      /*
        CREATE USER
      */
      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role:
            role ||
            'Counselor'
        });

      /*
        TOKEN
      */
      const token =
        generateToken(user);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email:
            user.email,
          role: user.role
        }
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Registration failed'
      });

    }
  }
);

/*
  LOGIN
*/
router.post(
  '/login',
  async (req, res) => {
    try {

      const {
        email,
        password
      } = req.body;

      /*
        FIND USER
      */
      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              'Invalid credentials'
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

        return res
          .status(400)
          .json({
            message:
              'Invalid credentials'
          });

      }

      /*
        TOKEN
      */
      const token =
        generateToken(user);

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email:
            user.email,
          role: user.role
        }
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Login failed'
      });

    }
  }
);

/*
  GET PROFILE
*/
router.get(
  '/profile',
  authMiddleware,
  async (req, res) => {
    try {

      const user =
        await User.findById(
          req.user.id
        ).select(
          '-password'
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              'User not found'
          });

      }

      res.json(user);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Failed to load profile'
      });

    }
  }
);

/*
  UPDATE PROFILE
*/
router.put(
  '/profile',
  authMiddleware,
  async (req, res) => {
    try {

      const {
        name,
        email
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              'User not found'
          });

      }

      user.name =
        name || user.name;

      user.email =
        email || user.email;

      await user.save();

      res.json({
        message:
          'Profile updated successfully',
        user
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Failed to update profile'
      });

    }
  }
);

/*
  CHANGE PASSWORD
*/
router.put(
  '/change-password',
  authMiddleware,
  async (req, res) => {
    try {

      const {
        currentPassword,
        newPassword
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              'User not found'
          });

      }

      /*
        VERIFY OLD PASSWORD
      */
      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {

        return res
          .status(400)
          .json({
            message:
              'Current password incorrect'
          });

      }

      /*
        HASH NEW PASSWORD
      */
      const salt =
        await bcrypt.genSalt(
          10
        );

      user.password =
        await bcrypt.hash(
          newPassword,
          salt
        );

      await user.save();

      res.json({
        message:
          'Password updated successfully'
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Failed to update password'
      });

    }
  }
);

/*
  GET COUNSELORS
*/
router.get(
  '/counselors',
  async (req, res) => {
    try {

      const counselors =
        await User.find({
          role: 'Counselor'
        }).select(
          'name email role'
        );

      res.json(counselors);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Failed to fetch counselors'
      });

    }
  }
);

module.exports = router;