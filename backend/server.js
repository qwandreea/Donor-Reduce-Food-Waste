const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const users = require("./routes/queries.routes");
const auth = require("./routes/auth.routes")
const db = require("./config/sequelize.config");

dotenv.config();
const app = express();

const port = process.env.PORT || 5000
var corsOptions = {
    origin: `http://localhost:${port}`
};

app.listen(port, () => {
    console.log(`App listening http://localhost:${port}`);
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("Synced db");
    }).catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

//Endpoints
app.use("/api/users", users);
app.use("/api/auth",auth);
app.use('/uploads',express.static('./uploads'))