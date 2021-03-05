const sql = require("./db.js");

// constructor
const Transactions = {};


Transactions.getAll = (userId,month, result) => {
  sql.query(`SELECT t.account_number, transaction_name, category_name, transaction_ts, amount, is_expense
  FROM transactions t JOIN accounts a ON t.account_number = a.account_number 
  JOIN (SELECT DISTINCT category_id,category_name,user_id,is_expense FROM category_goal) c ON c.category_id = t.category_id AND c.user_id = a.user_id
  WHERE a.user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND transaction_ts <= NOW()
  ORDER BY transaction_ts DESC`, (err, res) => {
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

Transactions.getBills = (userId,month, result) => {
  sql.query(`SELECT t.account_number, transaction_name, category_name, transaction_ts, amount, is_expense 
  FROM transactions t JOIN accounts a ON t.account_number = a.account_number 
  JOIN (SELECT DISTINCT category_id,category_name,user_id, is_expense  FROM category_goal WHERE is_expense = 1) c ON c.category_id = t.category_id AND c.user_id = a.user_id
  WHERE a.user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND transaction_ts <= NOW()
  ORDER BY transaction_ts DESC`, (err, res) => {
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

Transactions.getIncome = (userId,month, result) => {
  sql.query(`SELECT t.account_number, transaction_name, category_name, transaction_ts, amount, is_expense 
  FROM transactions t JOIN accounts a ON t.account_number = a.account_number 
  JOIN (SELECT DISTINCT category_id,category_name,user_id, is_expense  FROM category_goal  WHERE is_expense = 0) c ON c.category_id = t.category_id AND c.user_id = a.user_id
  WHERE a.user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND transaction_ts <= NOW()
  ORDER BY transaction_ts DESC`, (err, res) => {
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