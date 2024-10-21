const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    if (roles.includes(req.user.role)) {
      next()
    } else {
      res.status(403).json({ error: 'Acceso denegado' })
    }
  }
}

export default roleCheck
