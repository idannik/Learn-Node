const passport = require('passport'); // TODO: read about passport http://passportjs.org

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed login 😨',
    successRedirect:  "/",
    successFlash: 'You are now logged in!'
})

exports.logout = (req,res) => {
    req.logout();
    req.flash("success", "You are now logged out")
    res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next() 
    } else {
        req.flash('error', "Oops, you must be logged in")
        res.redirect('/login')
    }
}