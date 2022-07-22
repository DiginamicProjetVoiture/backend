module.exports = (app) => {
    const commandOrder = require("../controllers/commandOrder.controller.js");
  
    // Create a new product
    app.post("/commandOrders", commandOrder.create);
  
    // Retrieve all product
    app.get("/commandOrders", commandOrder.findAll);
  
    // Retrieve a single product with commandOrderId
    app.get("/commandOrders/:commandOrderId", commandOrder.findOne);
  
    // Update a product with commandOrderId
    app.put("/commandOrders/:commandOrderId", commandOrder.update);
  
    // Delete a product with commandOrderId
    app.delete("/commandOrders/:commandOrderId", commandOrder.delete);
  
    // Create a new product
    // app.delete("/commandOrders", commandOrder.deleteAll);
  };
  