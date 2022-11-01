require("dotenv").config();
const PORT = process.env.PORT || 3010;
const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();

const general = require(path.join(__dirname, "./modules/general"));
const error = require(path.join(__dirname, "./modules/error/error"));

//routes
const terminalRoute = require(path.join(__dirname, "./routes/terminal"));
const configRoute = require(path.join(__dirname, "./routes/config"));

//cookies
app.use(
	session({
		resave: true,
		secret: "Polaris",
		cookie: {
			maxAge: 60000 * 60 * 24,
		},
		saveUninitialized: true,
		name: "login",
	})
);

//html setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//middleware routes
app.use("/", terminalRoute);
app.use("/config", configRoute);

app.listen(PORT, () => {
	console.log(`${general.time}Now listening to requests on port ${PORT}`);
	console.log(`${general.time}http://localhost:${PORT}/`);
});
