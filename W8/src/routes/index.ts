import { Router, Request, Response } from "express";
import { validateToken } from "../middleware/validateToken"

const router = Router();

router.get("/api/private", validateToken, (req: Request, res: Response) => {
    res.status(200).json({message: "This is protected secure route!"})
});

export default router;