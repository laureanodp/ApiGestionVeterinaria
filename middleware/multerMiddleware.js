const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mascotas_images", // Carpeta donde se guardarán las imágenes
    format: async (req, file) => "jpeg", // Formato de salida
    public_id: (req, file) => file.originalname.split(".")[0], // Nombre basado en el archivo original
  },
});

const upload = multer({ storage });

module.exports = upload;
