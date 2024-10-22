# Aplicación Fullstack para prueba tecnica

¡Bienvenid@ a esta aplicación que está construida utilizando Node.js para el backend y React para el frontend.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

## Backend

El backend está construido con Node.js y Express, utilizando una base de datos PostgreSQL. Proporciona una API RESTful para manejar operaciones CRUD en empleados y solicitudes.

### Características principales:

- Autenticación de usuarios utilizando JWT
- Gestión de empleados (crear, leer, actualizar, eliminar)
- Gestión de solicitudes (crear, leer, actualizar, eliminar)
- Middleware de autorización para proteger rutas

### Tecnologías utilizadas:

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT) para autenticación
- bcrypt para el hash de contraseñas

### Estructura de archivos del backend:

- `controllers/`: Contiene la lógica de negocio para cada entidad (auth, employees, requests)
- `models/`: Define los modelos de datos para Sequelize
- `routes/`: Define las rutas de la API
- `middleware/`: Contiene middleware personalizado, como la autenticación
- `app.js`: El punto de entrada principal de la aplicación Express

## Frontend

El frontend está construido con React y utiliza Vite como herramienta de construcción. Implementa una interfaz de usuario para interactuar con la API del backend.

### Características principales:

- Autenticación de usuarios (inicio de sesión, cierre de sesión)
- Listado y gestión de empleados
- Listado y gestión de solicitudes
- Rutas protegidas para usuarios autenticados
- Diseño responsivo utilizando Tailwind CSS

### Tecnologías utilizadas:

- React
- Vite
- React Router para la navegación
- Axios para las llamadas a la API
- Tailwind CSS para el diseño
- Context API para el manejo del estado global

### Estructura de archivos del frontend:

- `components/`: Componentes reutilizables de React
- `context/`: Contextos de React, incluyendo el AuthContext
- `pages/`: Componentes de nivel superior para cada ruta principal
- `services/`: Funciones para interactuar con la API del backend
- `App.jsx`: El componente principal de la aplicación
- `main.jsx`: El punto de entrada de la aplicación React

## Cómo ejecutar el proyecto

### Requisitos previos

- Docker y Docker Compose instalados en su sistema
- Node.js y npm (para desarrollo local)

### Pasos para ejecutar

1. Clone el repositorio:
- git clone [https://github.com/tu-usuario/fullstack-app-node-react.git](https://github.com/tu-usuario/fullstack-app-node-react.git)
- cd fullstack-app-node-react

2. Cree un archivo `.env` en la raíz del proyecto con las siguientes variables:
- DB_USER=your_db_user
- DB_PASSWORD=your_db_password
- DB_NAME=your_db_name
- JWT_SECRET=your_jwt_secret

3. Ejecute la aplicación utilizando Docker Compose:
- docker-compose up --build

4. Una vez que los contenedores estén en funcionamiento, puede acceder a:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Desarrollo local

Si desea ejecutar el proyecto localmente para desarrollo:

1. Backend:
- cd backend
- npm install
- npm run dev

2. Frontend:
- cd frontend
- npm install
- npm run dev


### Configuración de la base de datos

Para el desarrollo local, asegúrese de tener PostgreSQL instalado y cree una base de datos para el proyecto. Luego, actualice las credenciales de la base de datos en el archivo de configuración del backend.

### Variables de entorno

Cree un archivo `.env` en la carpeta del backend con las siguientes variables:
- DB_USER=your_local_db_user
- DB_PASSWORD=your_local_db_password
- DB_NAME=your_local_db_name
- JWT_SECRET=your_local_jwt_secret

  
### Ejecutando migraciones

Si está utilizando Sequelize para las migraciones de la base de datos, ejecute:
- npx sequelize-cli db:seed:all

## Agradecimiento especial

Querido programador que está revisando este proyecto:

Quiero expresar mi más sincero agradecimiento por tomarte el tiempo de revisar y analizar este trabajo. Tu experiencia y perspectiva son invaluables para mejorar y perfeccionar esta aplicación. Espero que encuentres el código bien estructurado, fácil de entender y que cumpla con las mejores prácticas de desarrollo.

Tu feedback es extremadamente importante y apreciado. Si tienes alguna sugerencia, pregunta o comentario, por favor no dudes en compartirlo.

Gracias por tu tiempo, ¡Que tengas un excelente día!

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto conmigo a través de [juandiego-361@outlook.com].
