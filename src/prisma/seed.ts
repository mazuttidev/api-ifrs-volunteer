import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Alice Admin",
        email: "alice.admin@example.com",
        password: await bcrypt.hash("senhaAdmin123", 10),
        role: "admin",
        phone: "11990001122",
        birth_date: new Date("1985-01-10"),
        gender: "F",
        cpf: "111.222.333-44",
        blood_type: "O_pos",
        cep: "01001-000",
        address: "Rua Admin, 123",
        city: "São Paulo",
        state: "SP",
        availability: "Segunda a sexta, manhãs",
        skills: "Gestão, organização",
        emergency_contact: "João - 11998887766",
      },
      {
        name: "Oscar Organizer",
        email: "oscar.organizer@example.com",
        password: await bcrypt.hash("senhaOrg123", 10),
        role: "organizer",
        phone: "11990002233",
        birth_date: new Date("1990-05-20"),
        gender: "M",
        cpf: "555.666.777-88",
        blood_type: "A_pos",
        cep: "02002-000",
        address: "Avenida Organizer, 456",
        city: "Rio de Janeiro",
        state: "RJ",
        availability: "Segunda a sexta, tardes",
        skills: "Organização de eventos, logística",
        emergency_contact: "Maria - 21997766555",
      },
      {
        name: "Vinicius Volunteer",
        email: "vinicius.volunteer@example.com",
        password: await bcrypt.hash("senhaVol123", 10),
        role: "volunteer",
        phone: "11990003344",
        birth_date: new Date("1995-09-15"),
        gender: "M",
        cpf: "999.888.777-66",
        blood_type: "B_pos",
        cep: "03003-000",
        address: "Rua Volunteer, 789",
        city: "Porto Alegre",
        state: "RS",
        availability: "Finais de semana, manhãs",
        skills: "Atendimento ao público, primeiros socorros",
        emergency_contact: "Fernanda - 51998887766",
      },
    ],
  });

  await prisma.eventType.createMany({
    data: [
      { code: "blood_donation", description: "Campanha de doação de sangue" },
      { code: "food_drive", description: "Arrecadação de alimentos" },
      { code: "environmental", description: "Mutirão ambiental / ação ecológica" },
      { code: "clothing_donation", description: "Doação de roupas e agasalhos" },
      { code: "fundraising", description: "Campanha de arrecadação de fundos" },
      { code: "community_support", description: "Apoio à comunidade local" },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        title: "Campanha de Doação de Sangue",
        description: "Ação solidária em parceria com o Hemocentro.",
        event_type_id: 1,
        location: "IFRS Campus Bento Gonçalves",
        address: "Rua Exemplo, 123",
        start_at: new Date("2025-11-01 09:00:00"),
        end_at: new Date("2025-11-01 17:00:00"),
        capacity: 100,
        status: "draft",
        created_by: 2,
      },
      {
        title: "Treinamento de Primeiros Socorros",
        description: "Curso de primeiros socorros para voluntários.",
        event_type_id: 2,
        location: "Centro Comunitário Porto Alegre",
        address: "Av. Porto, 456",
        start_at: new Date("2025-11-05 14:00:00"),
        end_at: new Date("2025-11-05 18:00:00"),
        capacity: 50,
        status: "published",
        created_by: 2,
      },
      {
        title: "Evento de Conscientização Ambiental",
        description: "Palestra e workshop sobre sustentabilidade.",
        event_type_id: 3,
        location: "Auditório IFRS",
        address: "Rua Verde, 789",
        start_at: new Date("2025-11-10 10:00:00"),
        end_at: new Date("2025-11-10 16:00:00"),
        capacity: 80,
        status: "published",
        created_by: 2,
      },
    ],
  });

  await prisma.eventParticipant.createMany({
    data: [
      { event_id: 1, user_id: 3, role_in_event: "participant", status: "registered" },
      { event_id: 1, user_id: 2, role_in_event: "volunteer_coordinator", status: "registered" },
      { event_id: 2, user_id: 3, role_in_event: "participant", status: "registered" },
      { event_id: 2, user_id: 1, role_in_event: "volunteer_coordinator", status: "registered" },
      { event_id: 3, user_id: 3, role_in_event: "participant", status: "registered" },
      { event_id: 3, user_id: 2, role_in_event: "volunteer_coordinator", status: "registered" },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
