const transaction = require("../models/transaction.model.js");

exports.getAll = (req, res) => {
    transaction.getAll(req.params.userId,req.params.month, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found !`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving data!"
            });
          }
        } else 
        {
          res.header("Access-Control-Allow-Origin", "*");
          res.header('Access-Control-Allow-Credentials', true);
          res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.send(data);
        }
      });
};

exports.getBills = (req, res) => {
  transaction.getBills(req.params.userId,req.params.month, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found !`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving data!"
          });
        }
      } else 
      {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(data);
      }
    });
};

exports.getIncome = (req, res) => {
  transaction.getIncome(req.params.userId,req.params.month, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found !`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving data!"
          });
        }
      } else 
      {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(data);
      }
    });
};