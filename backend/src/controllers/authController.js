import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body
    await User.create({ username, password, role })
    res.status(201).json({ message: 'Usuario registrado exitosamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    console.log(user)

    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    console.log('isMatch', isMatch)

    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
