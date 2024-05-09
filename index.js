const mongoose = require("mongoose");
const express = require("express");

const dotenv = require("dotenv");
const DBConnection = require("./dbConnection");

const {users} = require("./data/users.json");
const {books} = require("./data/books.json");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config();

const app = express();
DBConnection();
const port = 8082;
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Server is up and running",    
    });
});

app.use("/users",userRouter);
app.use("/books",bookRouter);

app.get("*",(req,res)=>{
    res.status(400).json({
        message:"This route doesnot exist"
    });
});

app.listen(port,()=>{
    console.log(`Server is running at port:${port}`);
});
