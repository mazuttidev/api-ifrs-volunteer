import { UserModel } from "../models/userModel";
import * as userService from "./userService";
import { userSchema } from "../schemas/userSchema";
import { config } from "../config";
import jwt from "jsonwebtoken";

export async function register(data: UserModel): Promise<{
    user: { name: string; email: string };
    token: string;
    expiresIn: string;
}> {
    const dataParsed = userSchema.parse(data);
    const id = await userService.registerUser(dataParsed);

    const userModel = await userService.getUser(id);
    if (!userModel) throw new Error("Erro ao registrar usuário");

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

export async function login(data: { email: string; password: string }) {
    const userModel = await UserModel.findByEmail(data.email);
    if (!userModel) throw new Error("E-mail ou senha inválidos");

    const valid = await UserModel.validatePassword(
        data.password,
        userModel.password!
    );

    if (!valid) throw new Error("E-mail ou senha inválidos");

    // @ts-ignore
    const token = jwt.sign(
        { id: userModel.id, email: userModel.email, role: userModel.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    );

    return {
        user: {
            name: userModel.name!,
            email: userModel.email!,
            role: userModel.role!,
        },
        token,
        expiresIn: config.jwtExpiresIn,
    };
}
