// controllers/clienteController.js
const Cliente = require("../models/Cliente");

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;
    const nuevoCliente = await Cliente.create({
      nombre,
      telefono,
      email,
      user_id: req.user.id, // Asociar al usuario autenticado
    });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los clientes del usuario autenticado
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({ user_id: req.user.id });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

// Obtener un cliente por ID, asegurando que sea del usuario autenticado
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado" });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

// Actualizar un cliente (solo si pertenece al usuario autenticado)
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado" });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un cliente (solo si pertenece al usuario autenticado)
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado" });
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};
