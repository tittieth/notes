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
      encodeURI(newUser.newUserEmail),
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

/* Login user */

router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.userPassword;

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    if (userName && password) {
      let encodedUserName = encodeURI(userName);
      let sql = "SELECT * FROM users WHERE userName = ?";

      connection.query(sql, encodedUserName, (err, data) => {
        if (data.length > 0) {
          if (data[0].userPassword === password) {
            res.json(data);
          } else {
            res.send("Fel lösenord");
          }
        } else {
          res.send("Felaktigt användarnamn");
        }
      });
    } else {
      res.send("Fyll i användarnamn och lösenord");
    }
  });
});

module.exports = router;
