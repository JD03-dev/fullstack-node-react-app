import sequelize from './config/database.js'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/requests', requestRoutes)

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada')
  app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
  })
})
