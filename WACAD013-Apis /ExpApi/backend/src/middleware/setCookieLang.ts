import type { NextFunction, Request, Response} from "express";
import getEnv from "../utils/validateEnv.js";

function setCookieLang(req: Request, res: Response, next: NextFunction){
    if (!("lang" in req.cookies)) {
        const env = getEnv()
        res.cookie("lang", env.DEAFULT_LANG);
    }
    next();
}

export default setCookieLang;