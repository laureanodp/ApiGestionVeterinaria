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
    }, // Referencia a Cliente
    imageUrl: { type: String, required: false }, // URL de la imagen en el CDN
  },
  { timestamps: true }
);

// Índice compuesto para evitar mascotas con el mismo nombre para un cliente
mascotaSchema.index({ nombre: 1, cliente_id: 1 }, { unique: true });

module.exports = mongoose.model("Mascota", mascotaSchema);
