const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

  // Routes
const users = require('./routes/user');
  // const posts = require('./routes/posts');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
// app.use(express.static(path.join(__dirname, './uploads')));

app.use(cookieParser());
app.use(fileUpload());

app.use('/users', users);
  // app.use('/posts', posts);

const port = process.env.PORT || 9000;
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

sequelize.sync({ alter: true  }).then(() => {
    console.log("Database & tables created!")
});


module.exports = sequelize;
global.sequelize = sequelize;
