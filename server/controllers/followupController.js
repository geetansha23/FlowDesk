const FollowUp = require('../models/FollowUp');

exports.createFollowup =
  async (req, res) => {
    try {
      const followup =
        await FollowUp.create(
          req.body
        );

      res.status(201).json(
        followup
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          'Failed to create followup'
      });
    }
  };

exports.getLeadFollowups =
  async (req, res) => {
    try {
      const followups =
        await FollowUp.find({
          lead: req.params.leadId
        }).sort({
          createdAt: -1
        });

      res.json(followups);
    } catch (error) {
      res.status(500).json({
        message:
          'Failed to fetch followups'
      });
    }
  };