
exports.getPage = (req, res, next) => {
    if (req.user) {
        return res.json({
            isloggedin: req.session.isloggedin,
            user: req.session.user,
        });
    }
    res.json({
        msg: 'You are not logged in'
    })
};