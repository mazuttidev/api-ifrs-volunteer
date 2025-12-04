// import * as authService from "../src/services/authService";
// import * as userService from "../src/services/userService";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { prisma } from "../src/lib/prisma";
// import { UserRole, BloodType } from "@prisma/client";

// /* ============================================================
//    MOCK DO PRISMA
// ============================================================ */
// jest.mock("../src/lib/prisma", () => ({
//   prisma: {
//     user: {
//       findUnique: jest.fn(),
//       create: jest.fn(),
//     },
//   },
// }));

// /* ============================================================
//    MOCK DO BCRYPT (CORRIGIDO)
// ============================================================ */
// jest.mock("bcryptjs", () => ({
//   compare: jest.fn(),
//   hash: jest.fn(),
//   genSalt: jest.fn(),
// }));

// const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

// /* ============================================================
//    MOCK DO JWT
// ============================================================ */
// jest.mock("jsonwebtoken", () => ({
//   sign: jest.fn(),
// }));

// const mockedJwt = jwt as jest.Mocked<typeof jwt>;

// /* ============================================================
//    MOCK DO userService
// ============================================================ */
// jest.mock("../src/services/userService");

// const mockedUserService = userService as jest.Mocked<typeof userService>;

// describe("Auth Service", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   /* ============================================================
//      REGISTER — SUCESSO
//   ============================================================ */
//   it("should register a new user successfully", async () => {
//     const fakeUser = {
//       id: 1,
//       name: "Bruno",
//       email: "bruno@example.com",
//       role: UserRole.volunteer,
//       cpf: "12345678900",
//     };

//     const input = {
//       name: "Bruno",
//       email: "bruno@example.com",
//       password: "123456",
//       cpf: "12345678900",
//       blood_type: BloodType.AB_neg,
//     } as any;

//     mockedUserService.registerUser.mockResolvedValue("1");
//     mockedUserService.getUser.mockResolvedValue(fakeUser);

//     mockedJwt.sign.mockReturnValue("token123");

//     const result = await authService.register(input);

//     expect(result.user).toEqual({
//       name: "Bruno",
//       email: "bruno@example.com",
//     });

//     expect(result.token).toBe("token123");
//   });

//   /* ============================================================
//      REGISTER — ERRO
//   ============================================================ */
//   it("should throw error when userService.getUser returns null", async () => {
//     const input = {
//       name: "Bruno",
//       email: "bruno@example.com",
//       password: "123456",
//       cpf: "12345678900",
//       blood_type: "A+",
//     } as any;

//     mockedUserService.registerUser.mockResolvedValue("99");
//     mockedUserService.getUser.mockResolvedValue(null);

//     await expect(authService.register(input)).rejects.toThrow(
//       "Erro ao registrar usuário"
//     );
//   });

//   /* ============================================================
//      LOGIN — SUCESSO
//   ============================================================ */
//   it("should login successfully", async () => {
//     const input = {
//       email: "bruno@example.com",
//       password: "123456",
//     };

//     const fakeUserFromDB = {
//       id: 1,
//       name: "Bruno",
//       email: "bruno@example.com",
//       password: "hashedpass",
//       role: "volunteer",
//     };

//     (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUserFromDB);

//     // evitar erro de `never`
//     (mockedBcrypt.compare as jest.Mock).mockResolvedValue(true);

//     mockedJwt.sign.mockReturnValue("token123");

//     const result = await authService.login(input);

//     expect(result.user).toEqual({
//       name: "Bruno",
//       email: "bruno@example.com",
//       role: "volunteer",
//     });

//     expect(result.token).toBe("token123");
//   });

//   /* ============================================================
//      LOGIN — EMAIL NÃO EXISTE
//   ============================================================ */
//   it("should throw when user is not found", async () => {
//     (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

//     await expect(
//       authService.login({ email: "x@y.com", password: "123" })
//     ).rejects.toThrow("E-mail ou senha inválidos");
//   });

//   /* ============================================================
//      LOGIN — SENHA ERRADA
//   ============================================================ */
//   it("should throw when password is invalid", async () => {
//     const fakeUser = {
//       id: 1,
//       email: "bruno@example.com",
//       password: "hashedpass",
//       role: "volunteer",
//     };

//     (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

//     (mockedBcrypt.compare as jest.Mock).mockResolvedValue(false);

//     await expect(
//       authService.login({ email: "bruno@example.com", password: "wrong" })
//     ).rejects.toThrow("E-mail ou senha inválidos");
//   });
// });
