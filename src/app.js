require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

// //database
// const db = require('./database/database');
// db.then(() => console.log('Connected to mongodb')).catch(err => console.log(err));

//routes
const terminalRoute = require("./routes/terminal");
const aboutRoute = require("./routes/about");

//html setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//middleware routes
app.use("/", terminalRoute);
app.use("/about", aboutRoute);

//startup
app.listen(PORT, () => {
	console.log(`Now listening to requests on port ${PORT}`);
	console.log(`http://localhost:${PORT}/`);
});
