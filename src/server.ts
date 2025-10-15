import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3000");
});