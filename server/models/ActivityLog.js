const mongoose = require('mongoose');

const activitySchema =
  new mongoose.Schema(
    {
      lead: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
      },

      action: String,

      performedBy: String
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  'ActivityLog',
  activitySchema
);