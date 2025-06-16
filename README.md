Nombre del Proyecto E-commerce
Un proyecto de backend para una aplicación de e-commerce, desarrollado con Node.js, Express y Sequelize para gestionar productos, usuarios, categorías y pedidos.

🚀 Tecnologías Utilizadas
Node.js: Entorno de ejecución JavaScript.
Express.js: Framework web para Node.js.
Sequelize: ORM (Object-Relational Mapper) para Node.js, utilizado para interactuar con bases de datos relacionales MySQL.
Product
User
Category
Order
OrderProduct (tabla intermedia)
ProductCategory (tabla intermedia)

JSON Web Tokens (JWT): Para la autenticación de usuarios.
Bcrypt.js: Para el cifrado de contraseñas.
Postman: Herramienta utilizada para probar los endpoints de la API.
📦 Estructura del Proyecto
.
├── controllers/
│   ├── UserController.js
│   ├── ProductController.js
│   ├── CategoryController.js   # Asegúrate de que existe si lo mencionas en rutas/modelos
│   ├── OrderController.js      # Asegúrate de que existe si lo mencionas en rutas/modelos
│   └── (otros controladores si es necesario, ej. AuthController.js si tienes autenticación)
|
├── models/
│   ├── index.js                # Este archivo configura Sequelize y exporta todos los modelos. ¡Es crucial!
│   ├── product.js              # Modelo Sequelize para la tabla 'products'
│   ├── category.js             # Modelo Sequelize para la tabla 'categories'
│   ├── order.js                # Modelo Sequelize para la tabla 'orders'
│   ├── user.js                 # Modelo Sequelize para la tabla 'users'
│   ├── OrderProduct.js         # Modelo Sequelize para la tabla intermedia 'order_products' (o como la llames en DB)
│   └── ProductCategory.js      # Modelo Sequelize para la tabla intermedia 'product_categories' (o como la llames en DB)
|
├── routes/
│   ├── users.js
│   ├── products.js
│   ├── categories.js           # Agrega este si tienes rutas para categorías
│   ├── orders.js
│   └── (otros archivos de rutas, ej. auth.js)
|
├── config/
│   ├── config.json             # Configuración de base de datos de Sequelize (para diferentes entornos)
│   └── (opcional: otros archivos de configuración como 'config.js' para JWT, variables de entorno, etc.)
|
├── migrations/
│   └── (archivos de migración .js para crear y modificar tablas)
|
├── seeders/
│   ├── (archivos de seeder .js para poblar tablas con datos iniciales o de prueba)
│   └── (Importante: crea seeders para tus tablas intermedias también si necesitas datos de prueba en ellas)
|
├── docs/                       # ¡Esta es la carpeta donde deberían ir tus archivos de Swagger/OpenAPI!
│   ├── index.js                # Archivo principal para combinar toda la documentación de Swagger
│   ├── basicInfo.js            # Información básica de la API (título, versión, etc.)
│   ├── components.js           # Definiciones de esquemas (modelos de datos), seguridad, etc.
│   ├── paths.js                # Definiciones de todas las rutas y sus operaciones (GET, POST, etc.)
│   └── (otros archivos de documentación si los divides más)
|
├── middlewares/                # (Opcional) Para middlewares personalizados (ej. autenticación, manejo de errores)
│   ├── authMiddleware.js
│   └── errorHandler.js
|
├── utils/                      # (Opcional) Para funciones de utilidad que se usan en varios lugares (ej. helpers, validadores)
│   └── passwordHasher.js
|
├── app.js                      # O index.js - el archivo principal de tu aplicación Express
├── package.json                # Metadata del proyecto y dependencias
├── .env                        # (Opcional) Archivo para variables de entorno (BD, puertos, secretos)
└── README.md                   # Documentación del proyecto (cómo instalar, ejecutar, etc.)
⚙️ Configuración y Ejecución
Requisitos Previos
Asegúrate de tener instalado lo siguiente:

Node.js (v14 o superior)
npm (v6 o superior) o Yarn
MySQL
Instalación
Clona el repositorio:
Bash

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instala las dependencias:
Bash

npm install

Configuración de la Base de Datos
Base de Datos Relacional (Sequelize)
Asegúrate de que tu base de datos relacional (MySQL) esté funcionando.
Configura tus credenciales de base de datos en config/config.json.
Ejecuta las migraciones para crear las tablas:
Bash

npx sequelize-cli db:migrate
(Opcional) Si tienes seeders, puedes poblar la base de datos con datos iniciales:
Bash

npx sequelize-cli db:seed:all
Base de Datos MySQL 
Verifica la cadena de conexión en tu archivo app.js (o index.js). Debe ser similar a:
JavaScript


Asegúrate de que el puerto (ej. 27017) y el nombre de la base de datos son correctos.
Ejecución del Servidor
Inicia el servidor Node.js:
Bash

npm start
# o si usas nodemon para desarrollo
npm run dev
El servidor se ejecutará en el puerto especificado (ej. 8080 o 3000).
🧪 Endpoints de la API
Aquí hay algunos de los endpoints clave de la API. Asume que la URL base es http://localhost:[PUERTO], donde [PUERTO] es 8080 o 3000 según tu configuración.

Usuarios
POST /users - Crear un nuevo usuario (ej. {"name": "...", "email": "...", "password": "..."}).
400 Bad Request si faltan campos obligatorios (ej. "Por favor introduce tu nombre").
POST /users/login - Iniciar sesión de usuario y obtener un JWT.
GET /users - Obtener todos los usuarios (puede requerir autenticación JWT).
500 Internal Server Error con JsonWebTokenError si no se proporciona el token.
Productos
POST /products - Crear un nuevo producto (ej. {"name": "cafetera 12 v", "price": 49}). Puedes incluir CategoryIds: [1, 2] para asociar categorías.
GET /products - Obtener todos los productos, incluyendo sus órdenes y categorías asociadas.
Puede devolver 500 Internal Server Error si las relaciones no están configuradas correctamente en el controlador.
GET /products/price/asc - Obtener todos los productos ordenados por precio ascendente.
GET /products/:id - Obtener un producto por su ID.
GET /products/name/:name - Obtener un producto por nombre (uso de Op.like para búsqueda parcial).
PUT /products/:id - Actualizar un producto existente.
DELETE /products/:id - Eliminar un producto.
Comentarios



🤝 Contribución
¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un "fork" de este repositorio.
Crea una nueva rama para tu característica (git checkout -b feature/nombre-caracteristica).
Realiza tus cambios y haz commits (git commit -m 'feat: añade nueva característica').
Sube tus cambios a tu "fork" (git push origin feature/nombre-caracteristica).
Abre una Pull Request/Merge Request a la rama main de este repositorio.








