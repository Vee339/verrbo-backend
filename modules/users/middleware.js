function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.session.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
}

module.exports = {
  requireLogin,
  requireAdmin,
};
