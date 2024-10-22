# frontend/Dockerfile

# Imagen base de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Puerto que utiliza la aplicación que es el de vite
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "start"]
