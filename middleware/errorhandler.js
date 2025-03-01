function Errorhandler(Error,req,res,next){
    res.status(Error.status || 500);
    res.send("internal sever error")
}

module.exports = Errorhandler