import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Employee = sequelize.define('Employee', {
  date_entry: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})

export default Employee
