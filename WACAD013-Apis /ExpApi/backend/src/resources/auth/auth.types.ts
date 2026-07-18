import type { User } from "../../generated/prisma/client.js";

export type SignupDto = Pick<User, "name" | "email" | "password">;
export type LoginDto = Pick<User, "email" | "password">;