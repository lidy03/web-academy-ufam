import { genSalt, hash } from "bcryptjs";
import { prisma } from "../../utils/prismaClient.js";
import type { createUserDto, UserDto } from "./user.types.js";
import getEnv from "../../utils/validateEnv.js";

const env = getEnv();

export async function getUsers(): Promise<UserDto[]>{
    const users = await prisma.user.findMany();
    return users.map((u) => {
        const { password, ...user} = u
        return user;
    })
}

export async function findUserByEmail(email: string): Promise<UserDto |null>{
    const tempuser = await prisma.user.findFirst({ where: {email}});
    if (!tempuser) return null;
    const { password, ...user} = tempuser;
    return user;
}

export async function getUser(id: string): Promise<UserDto| null> {
    const tempuser = await prisma.user.findFirst({ where: {id}});
    if (!tempuser) return null
    const {password, ...user} = tempuser
    return user;
}


export async function createUser(data: createUserDto): Promise<UserDto> {
    const salt = await genSalt(env.ROUNDS_BCRYPT);
    const passwordHash = await hash(data.password, salt);
    const {password, ...user} = await prisma.user.create({ 
        data: { ... data, password:passwordHash},
    });
    return user;
}

