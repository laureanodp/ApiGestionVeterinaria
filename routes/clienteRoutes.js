// routes/clienteRoutes.js
const express = require("express");
const {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} = require("../controllers/clienteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCliente);
router.get("/", protect, getClientes);
router.get("/:id", protect, getClienteById);
router.put("/:id", protect, updateCliente);
router.delete("/:id", protect, deleteCliente);

module.exports = router;
