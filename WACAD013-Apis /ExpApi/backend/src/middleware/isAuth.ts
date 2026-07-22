import type { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session.userId) next();
    else res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
}

export default isAuth;