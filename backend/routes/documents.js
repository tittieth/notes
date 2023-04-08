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

// router.get('/:documentId', function(req, res) {
//   connection.connect((err) => {
//       if (err) {
//         console.log("err", err);
//       }
  
//       let sql = "SELECT documents. *, users.userName FROM documents JOIN users ON documents.userId = users.userId";
  
//       connection.query(sql, (err, data) => {
//         if (err) {
//           console.log("err", err);
//         }
  
//         console.log("data från query", data);
//         res.json(data);
//       });
//     });
// });

/* Add a new user */
router.post("/add", (req, res) => {
    let newDocument = req.body;
  
    connection.connect((err) => {
      if (err) {
        console.log("err", err);
      }
  
      let sql = "INSERT INTO documents (documentTitle, documentContent, userId) VALUES (?, ?, ?)";

      let values = [
        newDocument.newDocumentTitle,
        newDocument.newDocumentContent,
        newDocument.userId,
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
  
      let sql = "UPDATE documents SET documentContent = ? WHERE documentId = ?";

      let values = [
        updatedDocument.updatedContent,
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

module.exports = router;
