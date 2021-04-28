// module.exports.actionName = function(req, res){}

module.exports.home = function(req, res){

    // use of cookies and alteration of cookies in both browser and server. Just an example
    // console.log(req.cookies);
    // res.cookie('something', 'hey!');
    // res.cookie('user_id', 22);
    
    return res.render('home', {
        title: "Home"
    });
}
