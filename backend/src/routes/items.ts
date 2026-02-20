import { Router, Request, Response } from "express";
import { sameStructureAs } from "../sameStructureAs.js";
import { getItems } from "../itemsData.js";

export const itemsRouter = Router();

itemsRouter.post("/", (req: Request, res: Response) => {
  const { a, b } = req.body;

  if (!Array.isArray(a) || !Array.isArray(b)) {
    res.status(400).json({
      error: "Request body must contain arrays a and b",
      sameStructure: false,
    });
    return;
  }

  const sameStructure = sameStructureAs(a, b);

  if (sameStructure) {
    // Intentional typo for interview: candidate should fix "itmes" → "items"
    res.json({ itmes: getItems(), sameStructure: true });
  } else {
    res.status(200).json({ sameStructure: false });
  }
});
