const express = require("express");
const {
  crearMascota,
  obtenerMascotas,
  obtenerMascotasPorCliente,
  actualizarMascota,
  eliminarMascota,
} = require("../controllers/mascotaController");
const { protect } = require("../middlewares/authMiddleware"); // Middleware de autenticación

const router = express.Router();

// Crear una nueva mascota (requiere autenticación)
router.post("/", protect, crearMascota);

// Obtener todas las mascotas (requiere autenticación)
router.get("/", protect, obtenerMascotas);

// Obtener mascotas por cliente (requiere autenticación)
router.get("/cliente/:cliente_id", protect, obtenerMascotasPorCliente);

// Actualizar una mascota por ID (requiere autenticación)
router.put("/:id", protect, actualizarMascota);

// Eliminar una mascota por ID (requiere autenticación)
router.delete("/:id", protect, eliminarMascota);

module.exports = router;
