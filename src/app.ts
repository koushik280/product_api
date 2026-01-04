import express from "express";
import cors from "cors"

import productroutes from  "./routes/product.routes"

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api",productroutes)
export default app;
