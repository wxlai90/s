const checkAuth = (password) => (req, res, next) => {
    if (!password) {
        return next();
    }

    if (req.cookies.session === password) {
        return next();
    }

    const postedPassword = req.body.password

    if (postedPassword && postedPassword === password) {
        res.cookie('session', password)
        return next();
    }

    return res.render('login')
}


module.exports = checkAuth