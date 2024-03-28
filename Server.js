const express = require("express");
const app = express();
const PORT = 5000;
const db = require('./db');



const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("WELCOME TO HOTEL--HOW CAN I HELP U")
});



//import the route file

const personRoutes = require('./Routes/personRoutes');

const menuRoutes = require('./Routes/menuRoutes');
//use the Routers
app.use('/', personRoutes);
app.use('/', menuRoutes);

app.listen(PORT, (req, res) => {
    console.log(`server running on port no:${PORT}`);
});