// server.js
console.log("Aplicación iniciando...");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const clienteRoutes = require("./routes/clienteRoutes");
const mascotaRoutes = require("./routes/mascotaRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/mascotas", mascotaRoutes);



// Exportar el handler para Vercel
module.exports = app;
