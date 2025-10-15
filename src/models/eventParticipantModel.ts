import connection from "../config/database";

export class EventParticipant {
  id?: number;
  event_id: number;
  user_id: number;
  role_in_event: "participant" | "volunteer_coordinator";
  status: "registered" | "attended" | "no_show" | "cancelled";
  checkin_at?: Date | null;
  registered_at?: Date;
  updated_at?: Date;

  constructor(data: Partial<EventParticipant>) {
    this.event_id = data.event_id!;
    this.user_id = data.user_id!;
    this.role_in_event = data.role_in_event ?? "participant";
    this.status = data.status ?? "registered";
    this.checkin_at = data.checkin_at ?? null;
  }

  async save(): Promise<number> {
    const query = `
      INSERT INTO event_participants
        (event_id, user_id, role_in_event, status, checkin_at, registered_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await connection.query(query, [
      this.event_id,
      this.user_id,
      this.role_in_event,
      this.status,
      this.checkin_at,
    ]);

    // @ts-ignore
    return result.insertId;
  }

  static async findByEventAndUser(event_id: number, user_id: number) {
    const [rows] = await connection.query(
      "SELECT * FROM event_participants WHERE event_id = ? AND user_id = ?",
      [event_id, user_id]
    );
    // @ts-ignore
    return rows[0];
  }

  static async findByEvent(event_id: number) {
    const [rows] = await connection.query(
      "SELECT * FROM event_participants WHERE event_id = ?",
      [event_id]
    );
    // @ts-ignore
    return rows;
  }

  static async delete(event_id: number, user_id: number) {
    await connection.query(
      "DELETE FROM event_participants WHERE event_id = ? AND user_id = ?",
      [event_id, user_id]
    );
  }
}
