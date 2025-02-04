// models/Cliente.js
const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Relación con Usuario
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cliente", clienteSchema);
