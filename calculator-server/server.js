const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/calculator", require("./routes/api/calculator"));

const PORT = 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
