const ActivityLog =
  require('../models/ActivityLog');

const logActivity =
  async (
    lead,
    action,
    user
  ) => {
    await ActivityLog.create({
      lead,
      action,
      performedBy: user
    });
  };

module.exports = logActivity;