import type { User } from "../../generated/prisma/client.js";

export type createUserDto = Pick<User, "name" | "email" | "password" | "userTypeId">;

export type UserDto = Omit <User, "password">;
