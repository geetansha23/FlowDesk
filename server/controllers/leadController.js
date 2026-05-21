const Lead = require('../models/Lead');

/*
  GET ALL LEADS
*/
exports.getLeads = async (
  req,
  res
) => {
  try {

    const leads =
      await Lead.find().sort({
        createdAt: -1
      });

    res.status(200).json(
      leads
    );

  } catch (error) {

    console.error(
      'Get Leads Error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        'Failed to fetch leads'
    });
  }
};

/*
  GET SINGLE LEAD
*/
exports.getLeadById = async (
  req,
  res
) => {
  try {

    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {

      return res
        .status(404)
        .json({
          success: false,
          message:
            'Lead not found'
        });

    }

    res.status(200).json(
      lead
    );

  } catch (error) {

    console.error(
      'Get Lead Error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        'Failed to fetch lead'
    });
  }
};

/*
  CREATE LEAD
*/
exports.createLead = async (
  req,
  res
) => {
  try {

    const lead =
      await Lead.create(
        req.body
      );

    res.status(201).json(
      lead
    );

  } catch (error) {

    console.error(
      'Create Lead Error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        'Failed to create lead'
    });
  }
};

/*
  UPDATE LEAD
*/
exports.updateLead = async (
  req,
  res
) => {
  try {

    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!lead) {

      return res
        .status(404)
        .json({
          success: false,
          message:
            'Lead not found'
        });

    }

    res.status(200).json(
      lead
    );

  } catch (error) {

    console.error(
      'Update Lead Error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        'Failed to update lead'
    });
  }
};

/*
  DELETE LEAD
*/
exports.deleteLead = async (
  req,
  res
) => {
  try {

    const lead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {

      return res
        .status(404)
        .json({
          success: false,
          message:
            'Lead not found'
        });

    }

    res.status(200).json({
      success: true,
      message:
        'Lead deleted successfully'
    });

  } catch (error) {

    console.error(
      'Delete Lead Error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        'Failed to delete lead'
    });
  }
};