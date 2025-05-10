function authMiddleware(req, res, next) {
    if (!req.session.userLogin) {
    return res.redirect("/login");
    }
    next();
}

module.exports = authMiddleware;
