module.exports = app => {
    const transaction = require("../controller/transaction.controller.js");

    // Retrieve a block group demand for a single scenario
    app.get("/transaction/:userId/:month", transaction.getAll);
    app.get("/transaction/bills/:userId/:month", transaction.getBills);
    app.get("/transaction/income/:userId/:month", transaction.getIncome);
  };