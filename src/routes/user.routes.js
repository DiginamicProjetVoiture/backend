module.exports = (app) => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new product
    app.post("/users", user.create);
  
    // Retrieve a single product with userId
    app.get("/users/login/:userEmail", user.findByEmail);

    // Retrieve all product
    app.get("/users", user.findAll);
  
    // Retrieve a single product with userId
    // app.get("/users/:userId", user.findOne);

  
    // Update a product with userId
    app.put("/users/:userId", user.update);
  
    // Delete a product with userId
    app.delete("/users/:userId", user.delete);
  
    // Create a new product
    // app.delete("/users", user.deleteAll);
  };
  