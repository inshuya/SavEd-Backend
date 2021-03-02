module.exports = app => {
    const expense = require("../controller/expense.controller.js");

    // Retrieve a block group demand for a single scenario
    app.get("/expense/:userId/:month", expense.getBalance);
    app.get("/expense/daily/:userId/:month", expense.getDaily);
    app.get("/expense/category/:userId/:month", expense.getCategory);
  };