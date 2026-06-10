import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(express.json());
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
export default app