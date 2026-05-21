const { Parser } = require('json2csv');

exports.exportLeadsCSV = (leads) => {
  const parser = new Parser();

  return parser.parse(leads);
};