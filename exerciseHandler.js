const Exercise = require("./exerciseModel.js");
const { findUser } = require("./userHandler.js");
function add(req, res) {
  let { userId, description, duration, date } = req.body;
  findUser({ _id: userId }, function(data) {
    if (data == null) return res.json({ err: "unknown userId" });
    var exer = new Exercise({ userId, description, duration, date });
    exer.save(function(err, exer) {
      if (err) return console.log(err);
      res.json({
        username: data.username,
        _id: data._id,
        description: exer.description,
        duration: exer.duration,
        date: exer.date
      });
    });
  });
}

function log(req, res) {
  let { userId, from, to, limit } = req.query;
  if (!userId) return res.json({ err: "please provide a userId" });

  findUser({ _id: userId }, function(data) {
    if (data == null) return res.json({ err: "unknown userId" });
    let query = Exercise.find({ userId });
    if (from || to) {
      query = query.where("date");
      if (from) {
        query = query.where("date").gte(from);
      }
      if (to) {
        query = query.lte(to);
      }
    }
    if (limit) {
      query = query.limit(limit);
    }

    query.exec(function(err, log) {
      if (err) return console.log(err);
      res.json({
        username: data.username,
        _id: data._id,
        logs: log.map(item => {
          return {
            description: item.description,
            duration: item.duration,
            date: item.date
          };
        }),
        count: log.length
      });
    });
  });
}

module.exports = { add, log };
