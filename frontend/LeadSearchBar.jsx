Lead.find({
  fullName: {
    $regex: req.query.search,
    $options: 'i'
  }
});