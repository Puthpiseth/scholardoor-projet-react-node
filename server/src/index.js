const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
require('dotenv').config();

const profileRoute = require('./routes/profile')
const userRoute = require('./routes/user')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Parse request of content-type - application/x-www-form-urlencorded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ")
  next();
});

app.use('/users', profileRoute, userRoute);

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || "development";

app.listen(port, async () => {
    console.debug(`Server is listening on port ${port}`);
    console.debug(`Current environment is ${env}`);
});

sequelize
.authenticate()
.then(() => {
    console.log("Connection has been established successfully.");
})
.catch(error => {
    console.error("Unable to connect to the database:", error);
});

sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!")
});


module.exports = sequelize;
global.sequelize = sequelize;
