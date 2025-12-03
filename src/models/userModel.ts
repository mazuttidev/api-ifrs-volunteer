import { PrismaClient, UserRole, Gender, BloodType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserModel {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    phone?: string | null;
    birth_date?: Date | null;
    gender?: Gender | null;
    cpf?: string | null;
    blood_type?: BloodType | null;
    cep?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    availability?: string | null;
    skills?: string | null;
    emergency_contact?: string | null;

    constructor(data: Partial<UserModel>) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = (data.role as UserRole) ?? "volunteer";
        this.phone = data.phone ?? null;
        this.birth_date = data.birth_date ?? null;
        this.gender = (data.gender as Gender) ?? null;
        this.cpf = data.cpf ?? null;
        this.blood_type = (data.blood_type as BloodType) ?? null;
        this.cep = data.cep ?? null;
        this.address = data.address ?? null;
        this.city = data.city ?? null;
        this.state = data.state ?? null;
        this.availability = data.availability ?? null;
        this.skills = data.skills ?? null;
        this.emergency_contact = data.emergency_contact ?? null;
    }

    /* ------------------------------------------------------------------
     * SAVE (CREATE)
     * ------------------------------------------------------------------
     */
    async save(): Promise<number> {
        // Gera hash da senha caso esteja presente
        const hashed = this.password
            ? await bcrypt.hash(this.password, 10)
            : undefined;

        const user = await prisma.user.create({
            data: {
                name: this.name!,
                email: this.email!,
                password: hashed!,
                role: this.role!,
                phone: this.phone,
                birth_date: this.birth_date,
                gender: this.gender,
                cpf: this.cpf!,
                blood_type: this.blood_type,
                cep: this.cep,
                address: this.address,
                city: this.city,
                state: this.state,
                availability: this.availability,
                skills: this.skills,
                emergency_contact: this.emergency_contact,
            },
        });

        this.id = user.id;
        return user.id;
    }

    /* ------------------------------------------------------------------
     * UPDATE
     * ------------------------------------------------------------------
     */
    async update(data: Partial<UserModel>): Promise<void> {
        if (!this.id) throw new Error("ID não definido para o usuário");

        // Campos permitidos
        const allowedFields: (keyof UserModel)[] = [
            "name",
            "email",
            "role",
            "phone",
            "birth_date",
            "gender",
            "cpf",
            "blood_type",
            "cep",
            "address",
            "city",
            "state",
            "availability",
            "skills",
            "emergency_contact",
        ];

        // Monta objeto update igual ao seu SQL dinamicamente
        const updates: Record<string, any> = {};

        for (const key of allowedFields) {
            if (data[key] !== undefined) {
                updates[key] = data[key];
            }
        }

        await prisma.user.update({
            where: { id: this.id },
            data: {
                ...updates,
                updated_at: new Date(),
            },
        });
    }

    /* ------------------------------------------------------------------
     * FIND ALL (sem senha)
     * ------------------------------------------------------------------
     */
    static async findAll() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                birth_date: true,
                gender: true,
                cpf: true,
                blood_type: true,
                cep: true,
                address: true,
                city: true,
                state: true,
                availability: true,
                skills: true,
                emergency_contact: true,
                created_at: true,
                updated_at: true,
            },
        });
    }

    /* ------------------------------------------------------------------
     * FIND BY ID (sem senha)
     * ------------------------------------------------------------------
     */
    static async findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                birth_date: true,
                gender: true,
                cpf: true,
                blood_type: true,
                cep: true,
                address: true,
                city: true,
                state: true,
                availability: true,
                skills: true,
                emergency_contact: true,
                created_at: true,
                updated_at: true,
            },
        });
    }

    /* ------------------------------------------------------------------
     * FIND BY EMAIL (com senha)
     * ------------------------------------------------------------------
     */
    static async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                password: true, // necessário para login
            },
        });
    }

    /* ------------------------------------------------------------------
     * FIND BY CPF
     * ------------------------------------------------------------------
     */
    static async findByCPF(cpf: string) {
        return prisma.user.findUnique({
            where: { cpf },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                birth_date: true,
                gender: true,
                cpf: true,
                blood_type: true,
                cep: true,
                address: true,
                city: true,
                state: true,
                availability: true,
                skills: true,
                emergency_contact: true,
                created_at: true,
                updated_at: true,
            },
        });
    }

    /* ------------------------------------------------------------------
     * CHECK PASSWORD
     * ------------------------------------------------------------------
     */
    async checkPassword(password: string): Promise<boolean> {
        if (!this.password) return false;
        return bcrypt.compare(password, this.password);
    }

    static async validatePassword(plain: string, hash: string) {
        return bcrypt.compare(plain, hash);
    }
}
