// module.exports.actionName = function(req, res){}

module.exports.home = function(req, res){
    return res.render('home');
}

module.exports.profile = function(req, res){
    return res.render("user_profile");
}