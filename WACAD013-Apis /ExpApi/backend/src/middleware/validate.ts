import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import type { Schema } from "joi";

function validate(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        })
        if (error) res.status(StatusCodes.BAD_REQUEST).json(error)
        else next();
    } 
}

export default validate;