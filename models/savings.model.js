const sql = require("./db.js");

// constructor
const Savings = {};


Savings.getBalance = (userId,month, result) => {
    let q = ` SELECT
    (SELECT spending_limit FROM monthly_goal WHERE user_id = ${userId} and MONTH('${month}') = goal_month AND YEAR('${month}') = goal_year) -
    (SELECT SUM(amount) FROM transactions t JOIN accounts a ON t.account_number = a.account_number WHERE user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND isExpense = 1  AND transaction_ts <= NOW() +
    (SELECT saving_goal FROM monthly_goal WHERE user_id = ${userId} and MONTH('${month}') = goal_month AND YEAR('${month}') = goal_year))
    AS balance`;
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