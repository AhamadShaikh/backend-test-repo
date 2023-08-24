
const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const blogsRouter = require("./routes/blogRoutes")

app.use(express.json())

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use("/api", userRouter)
app.use("/api", blogsRouter)

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    connection()
    console.log("Port is running on 7000");
})