require("dotenv").config();
const express = require('express');
const {sequelize} = require("./models");

const app = express();

const port = process.env.PORT || 2000;
const env = process.env.NODE_ENV || "development";

app.listen(port, async () => {
    console.debug(`Server is listening on port ${port}`);
    console.debug(`Current environment is ${env}`);
});

app.get('/', (req, res) => {

    res.send("Hello Paris");
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
