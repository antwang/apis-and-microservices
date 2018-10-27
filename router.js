var express = require("express");
var router = express.Router();
var userHandler = require("./userHandler.js");
var exerciseHandler = require("./exerciseHandler.js");

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// 1. Create a New User
router.post("/api/exercise/new-user", userHandler.addUser);

// 2. get Users
router.get("/api/exercise/users", userHandler.getUser);

// 3. add exercises
router.post("/api/exercise/add", exerciseHandler.add);

// 4. get exercises log with userId(_id)
router.get("/api/exercise/log", exerciseHandler.log);

// GET users's exercise log ?{userId}[&from][&to][&limit] from, to = dates (yyyy-mm-dd); limit = number
// router.get('/api/exercise/log', function(req, res){
// })

/*
I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
*/
module.exports = router;
