module.exports = (app) => {
    const bill = require("../controllers/bill.controller.js");
  
    // Create a new product
    app.post("/bills", bill.create);
  
    // Retrieve all product
    app.get("/bills", bill.findAll);
  
    // Retrieve a single product with billId
    app.get("/bills/:billId", bill.findOne);
  
    // Update a product with billId
    app.put("/bills/:billId", bill.update);
  
    // Delete a product with billId
    app.delete("/bills/:billId", bill.delete);
  
    // Create a new product
    app.delete("/bills", bill.deleteAll);
  };
  