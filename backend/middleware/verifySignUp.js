//check if email is duplicate or not
const db = require("../config/sequelize.config");
const User = db.users;

checkDuplicateEmail = (req, res, next) => {
    if(req.body.email){
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Email already in use"
                })
                return
            }
            next()
        })
    }
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;