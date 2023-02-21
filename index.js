const express = require("express")
const app = express()
const userRoute = require("./routes/userRoutes")

// db connection
require("./config/dbConnection")

// middleware
app.use(express.json());

// port
const port = process.env.PORT || 1823

//routes
app.use("/api", userRoute)

// port listening
app.listen(port, ()=>{
    console.log(`port is running at ${port}`)
})