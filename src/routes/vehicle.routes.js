module.exports = (app) => {
    const vehicle = require("../controllers/vehicle.controller.js");
  
    // Create a new product
    app.post("/vehicles", vehicle.create);
  
    // Retrieve all product
    app.get("/vehicles", vehicle.findAll);
  
    // Retrieve a single product with vehicleId
    app.get("/vehicles/:vehicleId", vehicle.findOne);
  
    // Update a product with vehicleId
    app.put("/vehicles/:vehicleId", vehicle.update);
  
    // Delete a product with vehicleId
    app.delete("/vehicles/:vehicleId", vehicle.delete);
  
    // Create a new product
    app.delete("/vehicles", vehicle.deleteAll);
  };
  