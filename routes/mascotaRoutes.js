const express = require("express");
const {
  crearMascota,
  obtenerMascotas,
  obtenerMascotasPorCliente,
  actualizarMascota,
  eliminarMascota,
} = require("../controllers/mascotaController");
const { protect } = require("../middleware/authMiddleware"); // Middleware de autenticación
const upload = require("../middleware/multerMiddleware"); // Middleware de carga de imagenes

const router = express.Router();

// Crear una nueva mascota (requiere autenticación)
router.post("/", protect, upload.single("image"), crearMascota);

// Obtener todas las mascotas (requiere autenticación)
router.get("/", protect, obtenerMascotas);

// Obtener mascotas por cliente (requiere autenticación)
router.get("/cliente/:cliente_id", protect, obtenerMascotasPorCliente);

// Actualizar una mascota por ID (requiere autenticación)
router.put("/:id", protect, upload.single("image"), actualizarMascota);

// Eliminar una mascota por ID (requiere autenticación)
router.delete("/:id", protect, eliminarMascota);

module.exports = router;