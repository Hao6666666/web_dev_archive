const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const router = require("./src/router.js");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
