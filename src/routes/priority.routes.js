module.exports = (app) => {
    const priority = require("../controllers/priority.controller.js");
  
    // Create a new product
    app.post("/priorities", priority.create);
  
    // Retrieve all product
    app.get("/priorities", priority.findAll);
  
    // Retrieve a single product with priorityId
    app.get("/priorities/:priorityId", priority.findOne);
  
    // Update a product with priorityId
    app.put("/priorities/:priorityId", priority.update);
  
    // Delete a product with priorityId
    app.delete("/priorities/:priorityId", priority.delete);
  
    // Create a new product
    app.delete("/priorities", priority.deleteAll);
  };
  