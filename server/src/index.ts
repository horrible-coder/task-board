import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./db/index";
import { cardsRoute } from "./routes/cards";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

db();

app.use("/api/cards", cardsRoute);

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
