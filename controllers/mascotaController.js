const Mascota = require("../models/Mascota");
const Cliente = require("../models/Cliente");

// Crear una nueva mascota con o sin imagen
exports.crearMascota = async (req, res) => {
  try {
    const { nombre, especie, raza, edad, cliente_id } = req.body;

    // Verificar que el cliente exista
    const cliente = await Cliente.findById(cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Obtener la URL de la imagen (si fue enviada)
    const imageUrl = req.file ? req.file.path : null;

    // Crear la mascota
    const nuevaMascota = new Mascota({
      nombre,
      especie,
      raza,
      edad,
      cliente_id,
      imageUrl,
    });

    const mascotaGuardada = await nuevaMascota.save();
    res.status(201).json(mascotaGuardada);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la mascota" });
  }
};

// Obtener todas las mascotas
exports.obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate(
      "cliente_id",
      "nombre telefono email"
    );
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mascotas" });
  }
};

// Obtener mascotas por cliente
exports.obtenerMascotasPorCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    // Verificar que el cliente exista
    const cliente = await Cliente.findById(cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Buscar mascotas que pertenezcan al cliente
    const mascotas = await Mascota.find({ cliente_id });
    res.status(200).json(mascotas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al filtrar las mascotas por cliente" });
  }
};

// Actualizar una mascota con o sin imagen
exports.actualizarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especie, raza, edad, cliente_id } = req.body;

    // Verificar que el cliente asociado exista si se envía un nuevo cliente_id
    if (cliente_id) {
      const cliente = await Cliente.findById(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
    }

    // Obtener la URL de la imagen (si fue enviada)
    const imageUrl = req.file ? req.file.path : undefined;

    const mascotaActualizada = await Mascota.findByIdAndUpdate(
      id,
      {
        nombre,
        especie,
        raza,
        edad,
        cliente_id,
        ...(imageUrl && { imageUrl }),
      },
      { new: true, runValidators: true }
    );

    if (!mascotaActualizada) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.status(200).json(mascotaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mascota" });
  }
};

// Eliminar una mascota
exports.eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const mascotaEliminada = await Mascota.findByIdAndDelete(id);
    if (!mascotaEliminada) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.status(200).json({ message: "Mascota eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la mascota" });
  }
};

/*const Mascota = require("../models/Mascota");
const Cliente = require("../models/Cliente");

// Crear una nueva mascota vinculada a un cliente
exports.crearMascota = async (req, res) => {
  try {
    const { nombre, especie, raza, edad, cliente_id } = req.body;

    // Verificar que el cliente exista
    const cliente = await Cliente.findById(cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Crear la nueva mascota
    const nuevaMascota = new Mascota({
      nombre,
      especie,
      raza,
      edad,
      cliente_id,
    });

    const mascotaGuardada = await nuevaMascota.save();
    res.status(201).json(mascotaGuardada);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la mascota" });
  }
};

// Obtener todas las mascotas (opcional)
exports.obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate(
      "cliente_id",
      "nombre telefono email"
    );
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mascotas" });
  }
};

// Obtener mascotas por cliente (filtrar por cliente_id)
exports.obtenerMascotasPorCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    // Verificar que el cliente exista
    const cliente = await Cliente.findById(cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Buscar mascotas que pertenezcan al cliente
    const mascotas = await Mascota.find({ cliente_id });
    res.status(200).json(mascotas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al filtrar las mascotas por cliente" });
  }
};

// Actualizar una mascota por ID
exports.actualizarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especie, raza, edad, cliente_id } = req.body;

    // Verificar que el cliente asociado exista si se envía un nuevo cliente_id
    if (cliente_id) {
      const cliente = await Cliente.findById(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
    }

    const mascotaActualizada = await Mascota.findByIdAndUpdate(
      id,
      { nombre, especie, raza, edad, cliente_id },
      { new: true, runValidators: true }
    );

    if (!mascotaActualizada) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.status(200).json(mascotaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mascota" });
  }
};

// Eliminar una mascota por ID
exports.eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const mascotaEliminada = await Mascota.findByIdAndDelete(id);
    if (!mascotaEliminada) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.status(200).json({ message: "Mascota eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la mascota" });
  }
};
*/
