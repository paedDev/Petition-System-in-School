import "dotenv/config";
import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/db.js"
import path from "path"
import { fileURLToPath } from "url";
import pollRoutes from "./routes/pollRoutes.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/poll",pollRoutes)

// upload folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
    
})