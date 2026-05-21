const cron = require('node-cron');
const Lead = require('../models/Lead');

module.exports = () => {
  cron.schedule('0 0 * * *', async () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    await Lead.updateMany(
      {
        updatedAt: { $lt: threeDaysAgo }
      },
      {
        leadStatus: 'Needs Attention'
      }
    );

    console.log('Reminder automation executed');
  });
};