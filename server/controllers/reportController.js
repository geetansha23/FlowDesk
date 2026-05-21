const Lead = require('../models/Lead');

exports.monthlyReport =
  async (req, res) => {
    try {
      const report =
        await Lead.aggregate([
          {
            $group: {
              _id: {
                month: {
                  $month:
                    '$createdAt'
                }
              },

              totalLeads: {
                $sum: 1
              },

              admitted: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        '$leadStatus',
                        'Admitted'
                      ]
                    },
                    1,
                    0
                  ]
                }
              }
            }
          },

          {
            $sort: {
              '_id.month': 1
            }
          }
        ]);

      res.json(report);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          'Failed to load reports'
      });
    }
  };