const User = require("./userModel.js");

function addUser(req, res) {
  const username = req.body.username;
  findUser({ username }, function(data) {
    if (data) return res.json({ err: "username has taken" });
    var user = new User({ username });
    user.save(function(err, person) {
      if (err) return console.log(err);
      res.json({
        username: person.username,
        _id: person._id
      });
    });
  });
}

// get all users
function getUser(req, res) {
  const username = req.body.username;
  User.find()
    .select("username _id")
    .exec(function(err, users) {
      if (err) return console.log(err);
      res.json(users);
    });
}

function findUser(query, callback) {
  User.findOne(query, function(err, person) {
    callback(person);
  });
}
module.exports = { addUser, findUser, getUser };
