# **API de Gestión Veterinaria**

Esta es una API RESTful desarrollada con Node.js, Express y MongoDB para gestionar usuarios, clientes y sus respectivas mascotas. La API permite realizar operaciones CRUD completas y cuenta con autenticación mediante JWT.

## Características
- **CRUD de Usuarios** (registro y login con JWT).
- **CRUD de Clientes** (cada cliente pertenece a un usuario).
- **CRUD de Mascotas** (cada mascota pertenece a un cliente, con opción de adjuntar imágenes).
- **Autenticación protegida mediante JWT**.
- **Subida y almacenamiento de imágenes en Cloudinary**.
- **Validación de datos y manejo de errores**.
- **Organización modular del código**.
- **Protección de rutas con middleware de autenticación**.

## Tecnologías utilizadas
- **Node.js** – Entorno de ejecución.
- **Express** – Framework web para Node.js.
- **MongoDB** – Base de datos NoSQL.
- **Mongoose** – ODM para MongoDB.
- **JWT** – Autenticación basada en tokens.
- **bcrypt.js** – Encriptación de contraseñas.
- **dotenv** – Manejo de variables de entorno.
- **Cors** – Configuración de políticas de CORS.
- **Multer** – Middleware para la gestión de archivos.
- **Cloudinary** – Plataforma para el almacenamiento de imágenes.

---

## **Requisitos previos**

- Node.js instalado (v16 o superior).
- MongoDB instalado y corriendo localmente o en un servicio cloud.
- Configurar un archivo `.env` con las siguientes variables:

## **Estructura del Proyecto**

Este proyecto se organiza de la siguiente manera:

* **Carpetas principales:**
  * `controllers`: Contiene la lógica de negocio de la aplicación.
  * `middleware`: Almacena los middlewares, como el middleware de autenticación.
  * `models`: Define los modelos de Mongoose para interactuar con la base de datos (usuarios, clientes, mascotas).
  * `routes`: Define las rutas de la API (autenticación, clientes, mascotas).
  * `.env`: Contiene las variables de entorno de la aplicación.
  * `server.js`: Es el punto de entrada de la aplicación.
  * `package.json`: Contiene las dependencias y configuración del proyecto.

* **Estructura de archivos:**
  | Carpeta     | Descripción                                                               |
  |-------------|---------------------------------------------------------------------------|
  | controllers | Controladores para cada recurso (usuarios, clientes, mascotas)              |
  | middleware  | Middlewares para autenticación, validación, y manejo de archivos con Multer.|
  | models      | Modelos de Mongoose para representar los datos en la base de datos         |
  | routes      | Definición de las rutas de la API                                           |


### **Rutas**

| Método | Ruta                                | Descripción                                 | Requiere Autenticación |
|--------|-------------------------------------|---------------------------------------------|------------------------|
| POST   | `/api/auth/register`                | Registro de un nuevo usuario                | No                     |
| POST   | `/api/auth/login`                   | Inicio de sesión de usuario                 | No                     |
| GET    | `/api/users`                        | Obtiene todos los usuarios                  | Sí                     |
| POST   | `/api/clientes`                     | Crea un nuevo cliente                       | Sí                     |
| GET    | `/api/clientes`                     | Obtiene todos los clientes                  | Sí                     |
| GET    | `/api/clientes/:id`                 | Obtiene un cliente por ID                   | Sí                     |
| PUT    | `/api/clientes/:id`                 | Actualiza un cliente por ID                 | Sí                     |
| DELETE | `/api/clientes/:id`                 | Elimina un cliente por ID                   | Sí                     |
| POST   | `/api/mascotas`                     | Crea una nueva mascota                      | Sí                     |
| GET    | `/api/mascotas`                     | Obtiene todas las mascotas                  | Sí                     |
| GET    | `/api/mascotas/cliente/:cliente_id` | Obtiene las mascotas de un cliente por ID   | Sí                     |
| PUT    | `/api/mascotas/:id`                 | Actualiza una mascota por ID                | Sí                     |
| DELETE | `/api/mascotas/:id`                 | Elimina una mascota por ID                  | Sí                     |
