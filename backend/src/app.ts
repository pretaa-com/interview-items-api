import express from "express";
import cors from "cors";
import { itemsRouter } from "./routes/items.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

app.use("/api/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
