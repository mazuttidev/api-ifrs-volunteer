export interface User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: "admin" | "organizer" | "volunteer";
    phone?: string | null;
    birth_date?: Date | null;
    gender?: "M" | "F" | "O";
    cpf?: string;
    blood_type?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    availability?: string | null;
    skills?: string | null;
    emergency_contact?: string | null;
    created_at?: Date;
    updated_at?: Date;
}