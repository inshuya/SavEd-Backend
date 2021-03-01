const sql = require("./db.js");

// constructor
const Transactions = {};


Transactions.getAll = (userId,month, result) => {
  sql.query(`SELECT t.account_number, transaction_name, category, transaction_ts FROM transactions t JOIN accounts a ON t.account_number = a.account_number WHERE user_id = ${userId} and ${month} = MONTH(transaction_ts)`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transactions: ", res);
      result(null, res);
      return;
    }

    // not found scenario with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = Transactions;