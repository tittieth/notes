var express = require("express");
var router = express.Router();
const connection = require("../conn");

/* GET users listing. */
router.get("/", (req, res) => {

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "SELECT * FROM users";

    connection.query(sql, (err, data) => {
      if (err) {
        console.log("err", err);
      }

      console.log("data från query", data);
      res.json(data);
    });
  });
});

/* Add a new user */
router.post("/add", (req, res) => {
  let newUser = req.body;

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "INSERT INTO users (userName, userPassword, userEmail) VALUES (?, ?, ?)";
    let values = [
      encodeURI(newUser.newUserName), 
      encodeURI(newUser.newUserPassword), 
      encodeURI(newUser.newUserEmail)
    ];

    connection.query(sql, values, (err, data) => {
      if (err) {
        console.log("err", err);
      }

      console.log("data från query", data);
      res.json(data);
    });
  });
});

module.exports = router;
