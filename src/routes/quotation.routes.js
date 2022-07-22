module.exports = (app) => {
    const quotation = require("../controllers/quotation.controller.js");
  
    // Create a new product
    app.post("/quotations", quotation.create);
  
    // Retrieve all product
    app.get("/quotations", quotation.findAll);
  
    // Retrieve a single product with quotationId
    app.get("/quotations/:quotationId", quotation.findOne);
  
    // Update a product with quotationId
    app.put("/quotations/:quotationId", quotation.update);
  
    // Delete a product with quotationId
    app.delete("/quotations/:quotationId", quotation.delete);
  
    // Create a new product
    // app.delete("/quotations", quotation.deleteAll);
  };
  