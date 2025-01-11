// models/Mascota.js
const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    raza: { type: String, required: false },
    edad: { type: Number, required: false },
    cliente_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    }, // referencia a Cliente
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mascota", mascotaSchema);
