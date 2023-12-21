const express = require ('express');
const app = express();
require("dotenv/config");
const mongoose = require("mongoose");
app.use(express.json());
const api = process.env.API_URL;
app.use(express.json());



 
//routers
const orderRouter = require("./routes");
//routes
app.use(`${api}/orders`, orderRouter);




//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ordersMicroservice",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

  

app.listen(3001, () => console.log('Listening on port 3001'));

module.exports = app;