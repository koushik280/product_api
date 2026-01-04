import express from "express";
import productroutes from  "./routes/product.routes"
const app = express();
app.use(express.json());

app.use("/api",productroutes)
export default app;
