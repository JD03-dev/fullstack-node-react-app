import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import Employee from './employee.js'

const Request = sequelize.define('Request', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

Request.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Request, { foreignKey: 'employee_id' })

export default Request
