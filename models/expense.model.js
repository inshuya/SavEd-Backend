const sql = require("./db.js");

// constructor
const Expense = {};


Expense.getBalance = (userId,month, result) => {
    let q = ` SELECT
    (SELECT SUM(spend_limit) FROM category_goal WHERE user_id = ${userId} and MONTH('${month}') = goal_month AND YEAR('${month}') = goal_year AND is_expense=1) as limitt,
    (SELECT SUM(amount) FROM
    (SELECT SUM(amount) as amount,category_id  FROM transactions t JOIN accounts a ON t.account_number = a.account_number WHERE user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND transaction_ts <= NOW()
    GROUP BY category_id) t
    JOIN (SELECT DISTINCT category_id,category_name,user_id FROM category_goal  WHERE user_id = ${userId} and MONTH('${month}') = goal_month AND YEAR('${month}') = goal_year AND is_expense=1) c
    ON t.category_id = c.category_id  )
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


Expense.getCategory = (userId,month, result) => {
    let q = `SELECT category_name, spend_limit, SUM(amount) as amount 
    FROM (SELECT * FROM category_goal WHERE user_id = ${userId} and MONTH('${month}') = goal_month AND YEAR('${month}') = goal_year  AND is_Expense = 1) c
    LEFT JOIN (SELECT t.category_id,t.amount FROM transactions t JOIN accounts a ON t.account_number = a.account_number
    WHERE user_id = ${userId} and MONTH('${month}') = MONTH(transaction_ts) AND YEAR('${month}') = YEAR(transaction_ts) AND transaction_ts <= NOW()) t
    ON t.category_id = c.category_id
    GROUP BY category_name, spend_limit;`;
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