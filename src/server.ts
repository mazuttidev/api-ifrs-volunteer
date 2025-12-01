import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import eventParticipantRoutes from "./routes/eventParticipantRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/event-participants", eventParticipantRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});