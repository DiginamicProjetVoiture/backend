module.exports = (app) => {
    const customer = require("../controllers/customer.controller.js");
  
    // Create a new product
    app.post("/customers", customer.create);
  
    // Retrieve all product
    app.get("/customers", customer.findAll);
  
    // Retrieve a single product with customerId
    app.get("/customers/:customerId", customer.findOne);
  
    // Update a product with customerId
    app.put("/customers/:customerId", customer.update);
  
    // Delete a product with customerId
    app.delete("/customers/:customerId", customer.delete);
  
    // Create a new product
    app.delete("/customers", customer.deleteAll);
  };
  