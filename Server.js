const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.listen(5000, () => {
    console.log("Server is running on port 5000");
}
);

const UserRouter = require("./Routers/UserRouters");
app.use("/api/user", UserRouter);

mongoose
.connect(process.env.MONGO_URL)
.then(() =>{
    console.log("Connected to MongoDB");
})
.catch((err) =>{
    console.log("Error connecting to MongoDB", err);
});

