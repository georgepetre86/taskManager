import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import priceOfferItemRoute from "./routes/priceOfferItems.js"
import workDetailsRoute from "./routes/workDetails.js"
import taskNotesRoute from "./routes/taskNotes.js"
import tasksRoute from "./routes/tasks.js"
import projectRoute from "./routes/projects.js"
import priceOfferRoute from "./routes/priceOffer.js"
import activitiesRoute from "./routes/activities.js"
import cookieParser from "cookie-parser"

const cors = require("cors")

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected")
})

app(cors())

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/priceofferitem", priceOfferItemRoute)
app.use("/api/workdetails", workDetailsRoute)
app.use("/api/tasknotes", taskNotesRoute)
app.use("/api/tasks", tasksRoute)
app.use("/api/projects", projectRoute)
app.use("/api/priceoffer", priceOfferRoute)
app.use("/api/activities", activitiesRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend")
})