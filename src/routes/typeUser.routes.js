module.exports = (app) => {
    const typeUser = require("../controllers/typeUser.controller.js");
  
    // Create a new product
    app.post("/typeUsers", typeUser.create);
  
    // Retrieve all product
    app.get("/typeUsers", typeUser.findAll);
  
    // Retrieve a single product with typeUserId
    app.get("/typeUsers/:typeUserId", typeUser.findOne);
  
    // Update a product with typeUserId
    app.put("/typeUsers/:typeUserId", typeUser.update);
  
    // Delete a product with typeUserId
    app.delete("/typeUsers/:typeUserId", typeUser.delete);
  
    // Create a new product
    app.delete("/typeUsers", typeUser.deleteAll);
  };
  