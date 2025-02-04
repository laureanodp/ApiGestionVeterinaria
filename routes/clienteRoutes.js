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
const upload = require("../middleware/clientMulterMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("image"), createCliente);
router.get("/", protect, getClientes);
router.get("/:id", protect, getClienteById);
router.put("/:id", protect, upload.single("image"), updateCliente);
router.delete("/:id", protect, deleteCliente);

module.exports = router;
