import { PrismaClient, ParticipantRole, ParticipantStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class EventParticipantModel {
  id?: number;
  event_id!: number;
  user_id!: number;
  role_in_event!: ParticipantRole;
  status!: ParticipantStatus;
  checkin_at?: Date | null;

  constructor(data: Partial<EventParticipantModel>) {
    this.event_id = data.event_id!;
    this.user_id = data.user_id!;
    this.role_in_event = (data.role_in_event as ParticipantRole) ?? "participant";
    this.status = (data.status as ParticipantStatus) ?? "registered";
    this.checkin_at = data.checkin_at ?? null;
  }

  /* -----------------------------------------
   * SAVE (CREATE)
   * -----------------------------------------
   */
  async save(): Promise<number> {
    const participant = await prisma.eventParticipant.create({
      data: {
        event_id: this.event_id,
        user_id: this.user_id,
        role_in_event: this.role_in_event,
        status: this.status,
        checkin_at: this.checkin_at,
      },
    });

    return participant.id;
  }

  /* -----------------------------------------
   * FIND BY EVENT + USER
   * -----------------------------------------
   */
  static async findByEventAndUser(event_id: number, user_id: number) {
    return prisma.eventParticipant.findFirst({
      where: { event_id, user_id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        event: { select: { id: true, title: true, start_at: true } },
      },
    });
  }

  /* -----------------------------------------
   * FIND ALL BY EVENT
   * -----------------------------------------
   */
  static async findByEvent(event_id: number) {
    return prisma.eventParticipant.findMany({
      where: { event_id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { registered_at: "asc" },
    });
  }

  /* -----------------------------------------
   * DELETE
   * -----------------------------------------
   */
  static async delete(event_id: number, user_id: number) {
    await prisma.eventParticipant.deleteMany({
      where: { event_id, user_id },
    });
  }
}
