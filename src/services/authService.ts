import { User } from "../models/userModel";
import * as userService from "./userService";
import { userSchema } from "../schemas/userSchema";
import jwt from "jsonwebtoken";
import { config } from "../config";

export async function register(data: User): Promise<{
    user: { name: string; email: string };
    token: string;
    expiresIn: string;
}> {
    const dataParsed = userSchema.parse(data);
    const id = await userService.registerUser(dataParsed);

    const userModel = await userService.getUser(id);
    if (!userModel) throw new Error("Erro ao registrar usuário");

    // @ts-ignore
    const token = jwt.sign(
        { id: userModel.id, email: userModel.email },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    );

    let user = {} as { name: string; email: string };
    user.name = userModel.name!;
    user.email = userModel.email!;

    return { user, token, expiresIn: config.jwtExpiresIn };
}

export async function login(data: {
    email: string;
    password: string;
}): Promise<{
    user: { name: string; email: string, role: string };
    token: string;
    expiresIn: string;
}> {
    const userModel = await User.findByEmail(data.email);
    if (!userModel) throw new Error("E-mail ou senha inválidos");

    const valid = await userModel.checkPassword(data.password);
    if (!valid) throw new Error("E-mail ou senha inválidos");

    // @ts-ignore
    const token = jwt.sign (
        { id: userModel.id, email: userModel.email, role: userModel.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    );

    let user = {} as { name: string; email: string , role: string };
    user.name = userModel.name!;
    user.email = userModel.email!;
    user.role = userModel.role!;

    return { user, token, expiresIn: config.jwtExpiresIn };
}
