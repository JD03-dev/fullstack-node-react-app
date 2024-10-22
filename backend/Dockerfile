# backend/Dockerfile

# imagen base de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copia del resto de la aplicación
COPY . .

# Puerto que utiliza la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]