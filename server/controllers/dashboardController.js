const Lead = require('../models/Lead');

const User = require('../models/User');

const FollowUp = require('../models/FollowUp');

exports.getDashboardStats =
  async (req, res) => {
    try {
      /*
        TOTAL LEADS
      */
      const totalLeads =
        await Lead.countDocuments({
          isArchived: false
        });

      /*
        COUNSELORS
      */
      const counselors =
        await User.countDocuments({
          role: 'Counselor'
        });

      /*
        ADMISSIONS TEAM
      */
      const admissions =
        await User.countDocuments({
          role: 'Admissions'
        });

      /*
        ADMITTED LEADS
      */
      const admitted =
        await Lead.countDocuments({
          leadStatus:
            'Admitted',

          isArchived: false
        });

      /*
        PENDING FOLLOWUPS
      */
      const pendingFollowups =
        await FollowUp.countDocuments({
          completed: false
        });

      /*
        CONVERSION RATE
      */
      let conversionRate = 0;

      if (totalLeads > 0) {
        conversionRate =
          Math.round(
            (admitted /
              totalLeads) *
              100
          );
      }

      res.json({
        totalLeads,
        counselors,
        admissions,
        admitted,
        pendingFollowups,
        conversionRate
      });
    } catch (error) {
      console.log(
        'Dashboard Error:',
        error
      );

      res.status(500).json({
        message:
          'Failed to load dashboard stats'
      });
    }
  };