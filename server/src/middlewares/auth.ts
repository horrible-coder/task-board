import { NextFunction, Request, Response } from "express";
import { verify } from "../utils/jwt";

export const authUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.cookies["jwt"]) throw new Error("Token missing.");
		const token = req.cookies["jwt"];
		const user = await verify(token);
		if (!user) throw new Error("Incorrect jwt token.");
		(req as any).user = user;
		return next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: "Authorization failed. " + err.message,
		});
	}
};
