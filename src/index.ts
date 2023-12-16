import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import compression from "compression"
import "dotenv/config"
import mongoose from "mongoose"
import routers from "./routers"

const app = express()
const PORT = parseInt(process.env.PORT)
app.use(cors())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


const connectionMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connection to MongoDB Successfull")
    } catch(error) {
        console.log(error)
    }
}

connectionMongoDB()

app.use("/", routers())
app.listen(PORT, ()=> {console.log("Server running in port http://localhost:"+PORT)})

