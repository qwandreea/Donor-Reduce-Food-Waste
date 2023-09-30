const db = require("../config/sequelize.config");
const config = require("../config/auth.config");
const User = db.users;
const BusinessUsers = db.business_users;
const VolunteerUser = db.volunteer_users;
const Adrese = db.adrese;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { use } = require("../routes/queries.routes");
const { or } = require("sequelize");

exports.signup = (req, res) => {
    let userType = req.body.type;
    const isVolunteer = req.body.isVolunteer;
    if (isVolunteer)
        userType = "volunteer";

    switch (userType) {
        case undefined:
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                tip: 0
            }

            User.create(user)
                .then(data => {
                    res.send(data)
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occured while creating user"
                    })
                });
            break;
        case "business_user":
            const adresa = req.body.adresa
            const strada = adresa.split(',').shift().slice();
            const oras = adresa.split(',').pop().slice()
            const numar = adresa.substring(strada.length + 1, adresa.length - oras.length)
            User.create({
                firstName: req.body.firstName || "",
                lastName: req.body.lastName || "",
                phone: req.body.phone || "",
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                tip: 1,
                business_users: {
                    cif: req.body.cif,
                    business_name: req.body.denumire,
                    type: req.body.tip,
                },
                adrese: {
                    strada: strada,
                    numar: numar,
                    oras: oras
                }
            }, {
                include: [
                    {
                        model: BusinessUsers, as: "business_users"
                    },
                    {
                        model: Adrese, as: "adrese"
                    }
                ]
            }).then(data => {
                console.log('----', data)
                res.send(data)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating user"
                })
            });
            break;
        case "volunteer":
            User.create({
                firstName: req.body.firstName || "",
                lastName: req.body.lastName || "",
                phone: req.body.phone || "",
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                tip: 2,
                volunteer_users: {
                    represented_organisation: req.body.organisation
                }
            }, {
                include: [
                    {
                        model: VolunteerUser, as: "volunteer_users"
                    }
                ]
            }).then(data => {
                res.send(data)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating user"
                })
            });
            break;
    }
}


exports.signin = (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }

        var token = jwt.sign({ id: user.userid }, config.secret, {
            expiresIn: 86400
        });

        if (user.tip == 0) {
            res.status(200).send({
                id: user.userid,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                photo: user.photo || "",
                tip: user.tip,
                accessToken: token
            });
        } else if (user.tip == 1) {
            user.getBusiness_users().then(resp => {
                res.status(200).send({
                    id: user.userid,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                    photo: user.photo || "",
                    tip: user.tip,
                    accessToken: token,
                    cif: resp.dataValues.cif,
                    business_name: resp.dataValues.business_name,
                    type: resp.dataValues.type
                })
            }).catch(err => {
                res.send({ message: err.message })
            })
        }
        else if (user.tip == 2) {
            user.getVolunteer_users().then(resp => {
                res.status(200).send({
                    id: user.userid,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                    photo: user.photo || "",
                    tip: user.tip,
                    accessToken: token,
                    organisation: resp.dataValues.organisation
                })
            }).catch(err => {
                res.send({ message: err.message })
            })
        }

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};