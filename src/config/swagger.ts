import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IFRS Voluntariado API",
      version: "1.0.0",
      description: "API para gerenciar voluntários, eventos sociais e participantes",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            role: { type: "string", enum: ["admin", "organizer", "volunteer"] },
            phone: { type: "string" },
            birth_date: { type: "string", format: "date" },
            gender: { type: "string", enum: ["M", "F", "O"] },
            cpf: { type: "string" },
            blood_type: { type: "string", enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"] },
            address: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            availability: { type: "string" },
            skills: { type: "string" },
            emergency_contact: { type: "string" }
          }
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            event_type_id: { type: "integer" },
            location: { type: "string" },
            address: { type: "string" },
            start_at: { type: "string", format: "date-time" },
            end_at: { type: "string", format: "date-time" },
            capacity: { type: "integer" },
            status: { type: "string", enum: ["draft","published","closed","cancelled"] },
            created_by: { type: "integer" }
          }
        },
        EventParticipant: {
          type: "object",
          properties: {
            id: { type: "integer" },
            event_id: { type: "integer" },
            user_id: { type: "integer" },
            role_in_event: { type: "string", enum: ["participant","volunteer_coordinator"] },
            status: { type: "string", enum: ["registered","attended","no_show","cancelled"] },
            checkin_at: { type: "string", format: "date-time" },
            registered_at: { type: "string", format: "date-time" }
          }
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
