import "dotenv/config";
import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/db.js"
const app = express()


// to handle cors 
app.use(
    cors({
        origin : process.env.CLIENT_URL || "*",
        methods : ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders : ["Content-Type","Authorization"],

    })
)
app.use(express.json())
connectDB()

app.use("api/v1/auth",authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
    
})