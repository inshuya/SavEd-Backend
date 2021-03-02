const sql = require("./db.js");

// constructor
const Expense = {};


Expense.getBalance = (userId,month, result) => {
    let q = ` SELECT
    (SELECT spending_limit FROM monthly_goal WHERE user_id = ${userId} and MONTH('${month}') = goal_month AND YEAR('${month}') = goal_year) as limitt,
    (SELECT SUM(amount) FROM transactions t JOIN accounts a ON t.account_number = a.account_number WHERE user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND isExpense = 1  AND transaction_ts <= NOW())
    AS used`;
    sql.query(q, (err, res) => {
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

Expense.getDaily = (userId,month, result) => {
    let q = `SELECT DAY(transaction_ts) as day, SUM(amount) as amount FROM transactions t JOIN accounts a ON t.account_number = a.account_number 
            WHERE user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND isExpense = 1  AND transaction_ts <= NOW()
            GROUP BY DAY(transaction_ts)`;
    sql.query(q, (err, res) => {
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

Expense.getCategory = (userId,month, result) => {
    let q = `SELECT category, SUM(amount) as amount FROM transactions t JOIN accounts a ON t.account_number = a.account_number 
            WHERE user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND isExpense = 1  AND transaction_ts <= NOW()
            GROUP BY category`;
    sql.query(q, (err, res) => {
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

module.exports = Expense;