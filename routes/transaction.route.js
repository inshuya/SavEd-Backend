module.exports = app => {
    const transaction = require("../controller/transaction.controller.js");

    // Retrieve a block group demand for a single scenario
    app.get("/transaction/:userId/:month", transaction.getAll);

  };