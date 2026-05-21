const Lead = require('../models/Lead');
const { Parser } = require('json2csv');

exports.exportLeads = async (
  req,
  res
) => {
  try {
    const leads = await Lead.find();

    const fields = [
      'fullName',
      'email',
      'phoneNumber',
      'country',
      'leadStatus',
      'priority',
      'assignedCounselor'
    ];

    const parser = new Parser({
      fields
    });

    const csv = parser.parse(leads);

    res.header(
      'Content-Type',
      'text/csv'
    );

    res.attachment('leads.csv');

    return res.send(csv);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        'Failed to export leads'
    });
  }
};