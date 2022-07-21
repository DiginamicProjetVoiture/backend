module.exports = (app) => {
    const stock = require("../controllers/stock.controller.js");
  
    // Create a new product
    app.post("/stocks", stock.create);
  
    // Retrieve all product
    app.get("/stocks", stock.findAll);
  
    // Retrieve a single product with stockId
    app.get("/stocks/:stockId", stock.findOne);
  
    // Retrieve a single product with stockId
    app.get("/stocks/vehicle/:vehicleId", stock.findByVehicle);
  
    // Update a product with stockId
    app.put("/stocks/:stockId", stock.update);
  
    // Delete a product with stockId
    app.delete("/stocks/:stockId", stock.delete);
    
    // Delete a product with vehicleId
    app.delete("/stocks/vehicle/:vehicleId", stock.deleteByVehicle);

    // Create a new product
    app.delete("/stocks", stock.deleteAll);
  };
  