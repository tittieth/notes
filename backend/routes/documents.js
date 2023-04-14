var express = require('express');
var router = express.Router();
const connection = require("../conn");

/* GET documents. */
router.get('/', function(req, res) {
    connection.connect((err) => {
        if (err) {
          console.log("err", err);
        }
    
        let sql = "SELECT documents. *, users.userName FROM documents JOIN users ON documents.userId = users.userId";
    
        connection.query(sql, (err, data) => {
          if (err) {
            console.log("err", err);
          }
    
          console.log("data från query", data);
          res.json(data);
        });
      });
});

router.post('/user', function(req, res) {
  const userName = req.body.userName;
  connection.connect((err) => {
      if (err) {
        console.log("err", err);
      }
  
      // let sql = "SELECT * FROM documents WHERE userId = ?";
      const sql = 'SELECT documents.*, users.userName FROM documents INNER JOIN users ON documents.userId = users.userId WHERE users.userName = ?';
  
      connection.query(sql, userName, (err, data) => {
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
    let newDocument = req.body;
  
    connection.connect((err) => {
      if (err) {
        console.log("err", err);
      }
  
      // let sql = "INSERT INTO documents (documentTitle, documentContent, userId) VALUES (?, ?, ?)";
      let sql = "INSERT INTO documents (documentTitle, documentDescription, documentContent, userId) " +
      "SELECT ?, ?, ?, users.userId " +
      "FROM users " +
      "WHERE users.userName = ?";

      let values = [
        newDocument.newDocumentTitle,
        newDocument.newDocumentDescription,
        newDocument.newDocumentContent,
        newDocument.userName
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

  // Update documentcontent
  router.put("/:documentId", (req, res) => {
    let documentId = req.params.documentId;
    let updatedDocument = req.body;
  
    connection.connect((err) => {
      if (err) {
        console.log("err", err);
      }
  
      let sql = "UPDATE documents SET documentContent = ?, documentTitle = ?, documentDescription = ? WHERE documentId = ?";

      let values = [
        updatedDocument.updatedContent,
        updatedDocument.updatedTitle,
        updatedDocument.updatedDescription,
        documentId
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


  router.delete("/:documentId", (req, res) => {
    let documentId = req.params.documentId;
  
    connection.connect((err) => {
      if (err) {
        console.log("err", err);
      }
  
      let sql = "DELETE FROM documents WHERE documentId = ?";
  
      connection.query(sql, documentId, (err, data) => {
        if (err) {
          console.log("err", err);
        }
  
        console.log("data från query", data);
        res.status(200).json("Dokumentet raderat");
      });
    });
  });


module.exports = router;
