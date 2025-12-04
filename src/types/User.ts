import { Gender, UserRole, BloodType } from "@prisma/client";

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;

  phone?: string | null;
  birth_date?: Date | null;
  gender?: Gender | null;

  cpf?: string;
  blood_type?: BloodType | string | null;

  cep?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;

  availability?: string | null;
  skills?: string | null;
  emergency_contact?: string | null;

  created_at?: Date;
  updated_at?: Date;
}
