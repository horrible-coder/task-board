import { Router } from "express";
import {
  addCard,
  deleteCard,
  getCards,
  moveCard,
  updateCard,
} from "../controllers/cards";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.status(200).json({ cards });
  } catch (err) {
    return res.status(400).json({
      errors: { body: ["Failed to fetch cards", err.message] },
    });
  }
});

route.post("/", async (req, res) => {
  try {
    const card = await addCard(req.body);
    return res.status(201).json({ card });
  } catch (err) {
    return res.status(422).json({
      errors: { body: ["Add card failed", err.message] },
    });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const card = await updateCard(req.body);
    return res.status(200).json({ card });
  } catch (err) {
    return res.status(422).json({
      errors: { body: ["Update card failed", err.message] },
    });
  }
});

route.put("/move/board", async (req, res) => {
  try {
    const card = await moveCard(req.body);
    return res.status(200).json({ card });
  } catch (err) {
    return res.status(422).json({
      errors: { body: ["Move card failed", err.message] },
    });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const card = await deleteCard(req.params.id);
    return res.status(200).json({ card });
  } catch (err) {
    return res.status(422).json({
      errors: { body: ["Delete card failed", err.message] },
    });
  }
});

export const cardsRoute = route;
