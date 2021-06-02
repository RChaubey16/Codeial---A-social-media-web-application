module.exports.index = function (req, res) {
  return res.json(200, {
    message: "Straight outta comments API",
    comments: [],
  });
};
