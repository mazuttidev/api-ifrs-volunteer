import { PrismaClient, EventStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class EventModel {
  id?: number;
  title!: string;
  description?: string | null;
  event_type_id!: number;
  location!: string;
  address?: string | null;
  start_at!: Date;
  end_at?: Date | null;
  capacity?: number | null;
  status!: EventStatus;
  created_by!: number;

  constructor(data: Partial<EventModel>) {
    this.id = data.id;
    this.title = data.title!;
    this.description = data.description ?? null;
    this.event_type_id = data.event_type_id!;
    this.location = data.location!;
    this.address = data.address ?? null;
    this.start_at = new Date(data.start_at!);
    this.end_at = data.end_at ? new Date(data.end_at) : null;
    this.capacity = data.capacity ?? null;
    this.status = (data.status as EventStatus) ?? "draft";
    this.created_by = data.created_by!;
  }

  /* -----------------------------------------
   * CREATE
   * -----------------------------------------
   */
  async save(): Promise<number> {
    const event = await prisma.event.create({
      data: {
        title: this.title,
        description: this.description,
        event_type_id: this.event_type_id,
        location: this.location,
        address: this.address,
        start_at: this.start_at,
        end_at: this.end_at,
        capacity: this.capacity,
        status: this.status,
        created_by: this.created_by
      }
    });

    return event.id;
  }

  /* -----------------------------------------
   * UPDATE
   * -----------------------------------------
   */
  async update(id: number) {
    await prisma.event.update({
      where: { id },
      data: {
        title: this.title,
        description: this.description,
        event_type_id: this.event_type_id,
        location: this.location,
        address: this.address,
        start_at: this.start_at,
        end_at: this.end_at,
        capacity: this.capacity,
        status: this.status,
        updated_at: new Date()
      }
    });
  }

  /* -----------------------------------------
   * FIND ALL
   * -----------------------------------------
   */
  static async findAll() {
    return prisma.event.findMany({
      orderBy: { start_at: "asc" },
      include: {
        event_type: true,
        created_by_user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  /* -----------------------------------------
   * FIND BY ID
   * -----------------------------------------
   */
  static async findById(id: number) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        event_type: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true
              }
            }
          }
        }
      }
    });
  }

  /* -----------------------------------------
   * DELETE
   * -----------------------------------------
   */
  static async delete(id: number) {
    await prisma.event.delete({
      where: { id }
    });
  }
}
