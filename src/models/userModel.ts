import connection from "../config/database";

export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "organizer" | "volunteer";
  phone?: string | null;
  birth_date?: Date | null;
  gender?: "M" | "F" | "O" | null;
  cpf?: string;
  blood_type?: string | null;
  cep?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  availability?: string | null;
  skills?: string | null;
  emergency_contact?: string | null;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: Partial<User>) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role ?? "volunteer";
    this.phone = data.phone ?? null;
    this.birth_date = data.birth_date ?? null;
    this.gender = data.gender ?? null;
    this.cpf = data.cpf;
    this.blood_type = data.blood_type ?? null;
    this.cep = data.cep ?? null;
    this.address = data.address ?? null;
    this.city = data.city ?? null;
    this.state = data.state ?? null;
    this.availability = data.availability ?? null;
    this.skills = data.skills ?? null;
    this.emergency_contact = data.emergency_contact ?? null;
    this.created_at = data.created_at ?? new Date();
    this.updated_at = data.updated_at ?? new Date();
  }

  async save(): Promise<string> {
    const query = `
      INSERT INTO users
        (name, email, password, role, phone, birth_date, gender, cpf, blood_type, cep, address, city, state, availability, skills, emergency_contact, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(query, [
      this.name,
      this.email,
      this.password,
      this.role,
      this.phone,
      this.birth_date,
      this.gender,
      this.cpf,
      this.blood_type,
      this.cep,
      this.address,
      this.city,
      this.state,
      this.availability,
      this.skills,
      this.emergency_contact,
      new Date(),
    ]);
    // @ts-ignore
    this.id = result.insertId;
    return this.id!;
  }

  async update(data: Partial<User>): Promise<void> {
    const allowedFields: (keyof User)[] = [
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

    const fieldsToUpdate = allowedFields.filter(
      (key) => data[key] !== undefined
    );

    if (!fieldsToUpdate.length) return;

    for (const key of fieldsToUpdate) {
      (this as any)[key] = data[key];
    }

    const setClause = fieldsToUpdate.map((key) => `${key} = ?`).join(", ");
    const values = fieldsToUpdate.map((key) => (this as any)[key]);

    if (!this.id) throw new Error("ID não definido para o usuário");

    await connection.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      [...values, this.id]
    );
  }

  static async findAll(): Promise<Omit<User, "password">[] | null> {
    const [rows] = await connection.query(`
      SELECT  name,
              email,
              role,
              phone,
              birth_date,
              gender,
              cpf,
              blood_type,
              cep,
              address,
              city,
              state,
              availability,
              skills,
              emergency_contact,
              created_at,
              updated_at
      FROM users
    `);
    // @ts-ignore
    return rows.map((row) => new User(row));
  }

  static async findById(id: string): Promise<Omit<User, "password"> | null> {
    const [rows] = await connection.query(
      `
      SELECT  name,
              email,
              role,
              phone,
              birth_date,
              gender,
              cpf,
              blood_type,
              cep,
              address,
              city,
              state,
              availability,
              skills,
              emergency_contact,
              created_at,
              updated_at
      FROM users 
      WHERE id = ?
    `,
      [id]
    );
    // @ts-ignore
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await connection.query(
      `
      SELECT  name,
              email,
              role,
              phone,
              birth_date,
              gender,
              cpf,
              blood_type,
              cep,
              address,
              city,
              state,
              availability,
              skills,
              emergency_contact,
              created_at,
              updated_at
      FROM users 
      WHERE email = ?
    `,
      [email]
    );
    // @ts-ignore
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByCPF(cpf: string): Promise<Omit<User, "password"> | null> {
    const [rows] = await connection.query(
      `
        SELECT  name,
              email,
              role,
              phone,
              birth_date,
              gender,
              cpf,
              blood_type,
              cep,
              address,
              city,
              state,
              availability,
              skills,
              emergency_contact,
              created_at,
              updated_at
      FROM users 
      WHERE cpf = ?
      `,
      [cpf]
    );
    // @ts-ignore
    const user = rows[0];
    return user ? new User(user) : null;
  }
}
