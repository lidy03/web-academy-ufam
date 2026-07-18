import type { Request, Response } from "express"
import type { createUserDto } from "./user.types.js"
import { createUser, findUserByEmail, getUser, getUsers } from "./user.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userErrors } from "./user.erros.js";

const index = async (req: Request, res: Response) => {
    try{
        const users = await getUsers();
        res.status(StatusCodes.OK).json(users);
    }catch(err) {
        userErrors(err, res);
    }
};

const create = async (req: Request, res: Response) => {
    const data = req.body as createUserDto;
    try{
        if (await findUserByEmail(data.email)){
            return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
        }
        const user = await createUser(data)
        res.status(StatusCodes.CREATED).json(user)
    }catch(err){
        userErrors(err, res);
    }
};
const read = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try{
        const user = await getUser(id)
        res.status(StatusCodes.OK).json(user)
    }catch(err){
        userErrors(err, res);
    }
}
const update = async (req: Request, res: Response) => {}
const remove = async (req: Request, res: Response) => {}

export default { index, create, read, update, remove}

