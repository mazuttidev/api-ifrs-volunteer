import connection from "../config/database";

export class Event {
  id?: number;
  title: string;
  description?: string | null;
  event_type_id: number;
  location: string;
  address?: string | null;
  start_at: Date;
  end_at?: Date | null;
  capacity?: number | null;
  status: "draft" | "published" | "closed" | "cancelled";
  created_by: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: Partial<Event>) {
    this.title = data.title!;
    this.description = data.description ?? null;
    this.event_type_id = data.event_type_id!;
    this.location = data.location!;
    this.address = data.address ?? null;
    this.start_at = new Date(data.start_at!);
    this.end_at = data.end_at ? new Date(data.end_at) : null;
    this.capacity = data.capacity ?? null;
    this.status = data.status ?? "draft";
    this.created_by = data.created_by!;
  }

  async save(): Promise<number> {
    const query = `
      INSERT INTO events
        (title, description, event_type_id, location, address, start_at, end_at, capacity, status, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await connection.query(query, [
      this.title,
      this.description,
      this.event_type_id,
      this.location,
      this.address,
      this.start_at,
      this.end_at,
      this.capacity,
      this.status,
      this.created_by,
    ]);

    // @ts-ignore
    return result.insertId;
  }

  async update(id: number) {
    const query = `
      UPDATE events
      SET title = ?, description = ?, event_type_id = ?, location = ?, address = ?, start_at = ?, end_at = ?, capacity = ?, status = ?, updated_at = NOW()
      WHERE id = ?
    `;
    await connection.query(query, [
      this.title,
      this.description,
      this.event_type_id,
      this.location,
      this.address,
      this.start_at,
      this.end_at,
      this.capacity,
      this.status,
      id,
    ]);
  }

  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM events ORDER BY start_at ASC");
    // @ts-ignore
    return rows;
  }

  static async findById(id: number) {
    const [rows] = await connection.query("SELECT * FROM events WHERE id = ?", [id]);
    // @ts-ignore
    return rows[0];
  }

  static async delete(id: number) {
    await connection.query("DELETE FROM events WHERE id = ?", [id]);
  }
}
