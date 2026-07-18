import type { Request, Response } from "express"
import type { LoginDto, SignupDto } from "./auth.types.js"
import { createUser, findUserByEmail } from "../user/user.service.js";
import { UserTypes } from "../userType/userType.constants.js"
import { authErrors } from "./auth.erros.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCredentials } from "./auth.service.js";

const signup = async(req: Request, res: Response) =>{
    const data = req.body as SignupDto
    try{
        if (await findUserByEmail(data.email)){
            return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
        }
        const user = await createUser({ ...data, userTypeId: UserTypes.CLIENT})
        res.status(StatusCodes.CREATED).json(user);
    }catch(err){
        authErrors(err, res);
    }
};

const login = async (req: Request, res: Response) =>{
    const data = req.body as LoginDto
    try{
        const user = await checkCredentials(data)
        if(!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
        } else{
            req.session.userId = user.id;
            req.session.userTypeId = user.userTypeId;
            return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        }
    } catch (err){
        authErrors(err, res);
    } 
};

const logout = async (req: Request, res: Response) =>{
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }
        res.clearCookie("sid");
        res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
    });
};

export default { signup, login, logout}