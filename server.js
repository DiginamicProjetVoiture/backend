const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require("./src/routes/typeUser.routes.js")(app);
require("./src/routes/user.routes.js")(app);
require("./src/routes/customer.routes.js")(app);
require("./src/routes/vehicle.routes.js")(app);
require("./src/routes/stock.routes.js")(app);
require("./src/routes/quotation.routes.js")(app);
require("./src/routes/commandOrder.routes.js")(app);
require("./src/routes/bill.routes.js")(app);
require("./src/routes/priority.routes.js")(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});