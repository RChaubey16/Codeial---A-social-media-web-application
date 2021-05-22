module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        // Storing in response locals so that it can be accessed by ejs
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}