const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const router = require("./router.js");

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
