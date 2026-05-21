const mongoose = require('mongoose');

const followUpSchema =
  new mongoose.Schema(
    {
      lead: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
      },

      counselor: {
        type: String,
        default: ''
      },

      note: {
        type: String,
        required: true
      },

      nextFollowup: {
        type: Date
      },

      completed: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  'FollowUp',
  followUpSchema
);