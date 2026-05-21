const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getProfile = async (
  req,
  res
) => {
  const user = await User.findById(
    req.user.id
  ).select('-password');

  res.json(user);
};

exports.updateProfile = async (
  req,
  res
) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    {
      new: true
    }
  ).select('-password');

  res.json(user);
};

exports.updatePassword = async (
  req,
  res
) => {
  const user = await User.findById(
    req.user.id
  );

  const hashed =
    await bcrypt.hash(
      req.body.password,
      10
    );

  user.password = hashed;

  await user.save();

  res.json({
    message:
      'Password updated'
  });
};
exports.getCounselors =
  async (req, res) => {
    try {
      const counselors =
        await User.find({
          role: 'Counselor'
        }).select(
          'name email'
        );

      res.json(counselors);
    } catch (error) {
      res.status(500).json({
        message:
          'Failed to fetch counselors'
      });
    }
  };