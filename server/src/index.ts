import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./db/index";
import { cardsRoute } from "./routes/cards";
import { usersRoute } from "./routes/users";
import { authUser } from "./middlewares/auth";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

db();

app.use("/api", usersRoute);
app.use("/api/cards", authUser, cardsRoute);

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
