const express = require("express");
const cors = require("cors");
const {connection} = require("./db");
const {userRouter} = require("./Routes/usersRoute");
const {postRouter} = require("./Routes/postsRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res)=>{
    res.send("Home Page")
})

app.listen(8080, async()=>{
    try {
        await connection
        console.log("server is runing on port 8080");
        console.log("Connected to the database");
    } catch (error) {
        console.log(error)
    }
})