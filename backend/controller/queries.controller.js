const multer = require("multer");
const db = require("../config/sequelize.config");
const path = require('path')
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize
const BusinessUsers = db.business_users;
const Reviews = db.reviews;
var bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { stat } = require("fs");

const User = db.users;
const Volunteer = db.volunteer_users;
const Adrese = db.adrese;
const Categories = db.categories;
const ProdusListat = db.food_listing;
const ProduseListateCategorii = db.produse_categorii;
const ProduseRezervate = db.items_rezervate;
const CereriProduse = db.cereri_produse;

// ---------- User controller ------------
exports.findAll = async (req, res) => {
    await User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findByID = async (req, res) => {
    const id = req.params.id;
    await User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving user ${id}`
            });
        });
};

exports.create = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
    }

    await User.create(user)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating user"
            })
        });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        photo: req.file.path
    }
    if (Object.keys(req.body).length == 0) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    await User.update(updatedUser, {
        where: { userid: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send("User successfully updated")
        } else {
            res.send("User was not updated")
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.countUsers = async (req, res) => {
    await User.count().then((data) => {
        res.send({ value: data })
    })
}

exports.countVolunteers = async (req, res) => {
    await Volunteer.count().then((data) => {
        res.send({ value: data })
    })
}

exports.countReservedItems = async (req, res) => {
    await ProduseRezervate.count().then((data) => {
        res.send({ value: data })
    })
}

//------Categories controller--------
exports.getCategories = async (req, res) => {
    await Categories.findAll({ attributes: [['id', 'value'], 'label'] }).then(data => {
        res.send(data)
    })
}

exports.getMainCategories = async (req, res) => {
    await Categories.findAll({
        where: {
            parent_id: 0
        },
        order: [
            ['id', 'DESC'],
        ],
    }).then(data => {
        res.send(data)
    })
}

exports.getSubcategories = async (req, res) => {
    id = req.params.id;
    await Categories.findAll({
        where: {
            parent_id: id
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.send({ message: err.message })
    })
}

exports.getUserAddresses = async (req, res) => {
    userId = req.params.id;
    await Adrese.findAll({
        where: {
            user_id_fk: userId
        },
        attributes: [['id', 'value'], 'strada', 'numar', 'oras']
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.send({ message: err.message })
    })
}

exports.getAddressById = async (req, res) => {
    addrId = req.params.id;
    await Adrese.findByPk(addrId)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find address with id ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving address ${id}`
            });
        });
}

exports.createUserAddress = async (req, res) => {
    userId = req.params.id;
    const adresa = {
        strada: req.body.strada,
        numar: req.body.numar,
        oras: req.body.oras,
        user_id_fk: userId
    }
    await Adrese.create(adresa)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating address"
            })
        });

}

exports.deleteAddress = async (req, res) => {
    addrId = req.params.id;
    await Adrese.destroy({
        where: { id: addrId }
    })
        .then(num => {
            if (num == 1)
                res.status(204).send("Address deleted")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while deleting the address"
            })
        })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' }
}).single('image')

exports.postFoodListing = async (req, res) => {
    let produs_listat_id = '';
    let errMessage = '';

    const produsListat = {
        user_id_fk: req.body.user,
        title: req.body.title || "",
        description: req.body.description || "",
        state: req.body.state,
        image: req.file.path || "",
        quantity: req.body.quantity,
        units: req.body.units,
        expiringDate: req.body.expiringDate,
        pickupInterval: req.body.pickupInterval || "",
        price: req.body.price,
        isDonating: req.body.isDonating,
        lat: req.body.lat,
        long: req.body.long,
        adress_pickup_id: req.body.selectedAdress["value"]
    }

    await ProdusListat.create(produsListat)
        .then(data => {
            produs_listat_id = data.dataValues.id
        }).catch(err => {
            errMessage.concat(err.message + ' ')
        });

    if (produs_listat_id !== '') {
        const categories = req.body.category
        for (key in categories) {
            await ProduseListateCategorii.create({
                food_listing_id_fk: produs_listat_id,
                category_id_fk: categories[key]
            }).catch(err => {
                errMessage.concat(err.message + ' ')
            })
        }
    }

    let splitId = produs_listat_id.split('-')[0]
    if (errMessage != '') {
        res.status(500).send(errMessage)
    } else {
        res.status(200).send(`Product with id #${splitId} has successfully added`)
    }

}

exports.getAllItems = async (req, res) => {
    await ProdusListat.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}

exports.getAllUserItems = async (req, res) => {
    const userId = req.params.id;
    await ProdusListat.findAll({
        where: {
            user_id_fk: userId
        },
        include: [{
            model: Adrese,
            as: 'food_listing_add'
        },{
            model: ProduseRezervate,
            as: 'items_rezervate_items',
            include:[{
                model: User,
                as: 'items_rezervate_user'
            }]
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    });
}

exports.getItemDetailsById = async (req, res) => {
    const itemId = req.params.id;
    await ProdusListat.findAll({
        where: {
            id: itemId
        },
        include: [{
            model: Adrese,
            as: 'food_listing_add'
        },
        {
            model: User,
            as: 'food_listing'
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    });
}

exports.activateListedItem = async (req, res) => {
    const itemId = req.params.id;
    const isActive = req.body.active;
    await ProdusListat.update(
        {
            isActive: isActive,
        },
        {
            where: {
                id: itemId
            }
        }
    ).then(num => {
        if (num == 1) {
            res.status(200).send("Item updated")
        } else {
            res.send("Item was not updated")
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.getUserReservedItems = async (req, res) => {
    const userId = req.params.id;
    await ProduseRezervate.findAll({
        where: {
            user_id_fk: userId
        },
        include: [{
            model: ProdusListat,
            as: 'items_rezervate_items',
            include: [{
                model: User,
                as: 'food_listing',
                include: [{
                    model: Adrese,
                    as: 'adrese'
                }]
            }]
        }]
    }).then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.getUnreservedListedItems = async (req, res) => {
    const categoryId = req.body.category || 12;
    const reservedItemsIds = [];
    const subcategoryIds = [];

    await ProduseRezervate.findAll()
        .then(data => {
            data.forEach(element => {
                reservedItemsIds.push(element.item_id_fk)
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

    if (categoryId != 12 && categoryId != 'undefined') {
        await Categories.findAll({
            where: {
                parent_id: categoryId
            }
        }).then(data => {
            data.forEach(element => {
                subcategoryIds.push(element.id)
            });
            subcategoryIds.push(categoryId)
        })
    }

    if (categoryId == 12) {
        await ProdusListat.findAll({
            distinct: true,
            where: {
                id: {
                    [Op.notIn]: reservedItemsIds
                },
                isActive: 1,
                expiringDate: {
                    [Op.gte]: new Date()
                }
            }, include: [{
                model: Adrese,
                as: 'food_listing_add',
            }, {
                model: User,
                as: 'food_listing',
                include: [{
                    model: Reviews,
                    as: 'user_reviews',
                }, {
                    model: BusinessUsers,
                    as: 'business_users',

                }]
            }]
        }).then((data) => {
            newData = data.filter((obj) => {
                return obj.food_listing.business_users == null
            })
            res.send(newData)
        })
    } else {
        await ProduseListateCategorii.findAll({
            distinct: true,
            where: {
                category_id_fk: {
                    [Op.in]: subcategoryIds || categoryId
                }
            },
            include: {
                model: ProdusListat,
                as: 'food_listing_category',
                distinct: true,
                where: {
                    id: {
                        [Op.notIn]: reservedItemsIds
                    },
                    isActive: 1,
                    expiringDate: {
                        [Op.gte]: new Date()
                    }
                },
                include: [{
                    model: Adrese,
                    as: 'food_listing_add',
                }, {
                    model: User,
                    as: 'food_listing',
                    include: [{
                        model: Reviews,
                        as: 'user_reviews',
                    }, {
                        model: BusinessUsers,
                        as: 'business_users',
                    }]
                }]
            }
        }).then(data => {
            newData = data.filter((obj) => {
                return obj.food_listing_category.food_listing.business_users == null
            })
            res.send(newData)
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    }
}

exports.createReservation = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    let reservationIdMax;
    await ProduseRezervate.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxId']],
        raw: true,
    }).then(async (data) => {
        reservationIdMax = data[0].maxId == null ? 1 : data[0].maxId + 1
        await ProduseRezervate.create({
            id: reservationIdMax,
            user_id_fk: userId,
            item_id_fk: itemId
        })
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while reservating item"
                })
            });
    });
}

exports.getAllOrase = async (req, res) => {
    await Adrese.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('oras')), 'oras'],
        ]
    }).then(function (orase) {
        var finalArray = orase.map(function (obj) {
            return obj.oras;
        });
        finalArray.push("Toate")
        res.send(finalArray)
    })
}

exports.deleteReservedItem = async (req, res) => {
    const itemId = req.params.id;
    await ProduseRezervate.destroy({
        where: { id: itemId }
    })
        .then(num => {
            if (num == 1)
                res.status(204).send("Item was deleted from reserved")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while deleting the item"
            })
        })
}

exports.getBusinessUserDetails = async (req, res) => {
    const userId = req.params.id;
    await User.findByPk(userId, {
        include: [
            {
                model: BusinessUsers, as: "business_users"
            },
            {
                model: Adrese, as: "adrese"
            }
        ]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving user ${id}`
            });
        });
}

exports.getCereriBusinessUser = async (req, res) => {
    const userId = req.params.id;
    await User.findAll({
        where: {
            userid: userId
        },
        include: [
            {
                model: BusinessUsers,
                as: "business_users",
                include: [{
                    model: CereriProduse,
                    as: "cereri_produse_business",
                    include: [{
                        model: ProdusListat,
                        as: "items_cereri_produse",
                        include: [{
                            model: Adrese,
                            as: "food_listing_add",
                        }]
                    }, {
                        model: Volunteer,
                        as: "cereri_produse_volunteer",
                        include: [{
                            model: User,
                            as: "volunteer_users",
                        }]
                    }]
                }
                ]
            }
        ]
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find user with id ${id}`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving user ${id}`
            });
        });
}

exports.countNewRequestsToday = async (req, res) => {
    const userId = req.params.id
    let bUserId = ''
    await User.findByPk(userId, {
        attributes: [],
        include: [{
            model: BusinessUsers,
            as: "business_users",
            attributes: ["id"]
        }]
    }).then((data) => {
        bUserId = data.business_users.id
    })
    await CereriProduse.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'n_id'],],
        where: {
            [Op.and]: [{
                status_cerere: {
                    [Op.eq]: 'In progres'
                }
            },
            {
                buser_id_fk: {
                    [Op.eq]: bUserId
                }
            }
            ]
        }
    }).then((data) => res.send(data[0]));
}

exports.approveCerere = async (req, res) => {
    const idCerere = req.body.id;
    const status = req.body.status;

    await CereriProduse.update(
        { status_cerere: status },
        { where: { id: idCerere } }
    ).then(num => {
        if (num == 1) {
            res.status(200).send("Cerea a fost actualizata")
        } else {
            res.send("Cererea nu a fost actualizata")
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.getAllListedItemsBusiness = async (req, res) => {
    const userId = req.params.id
    await User.findByPk(userId, {
        attributes: [],
        include: [{
            model: BusinessUsers,
            as: "business_users",
        }, {
            model: ProdusListat,
            as: "food_listing",
            include: [{
                model: Adrese,
                as: "food_listing_add",
            },
            {
                model: CereriProduse,
                as: "items_cereri_produse"
            }
            ]
        }]
    }).then((data) => {
        res.send(data)
    })
}

exports.approvedListedItemsBusiness = async (req, res) => {
    const userId = req.params.id
    await User.findByPk(userId, {
        attributes: [],
        include: [{
            model: ProdusListat,
            as: "food_listing",
            include: [{
                model: Adrese,
                as: "food_listing_add",
            },
            {
                model: CereriProduse,
                as: "items_cereri_produse",
                where: {
                    status_cerere: {
                        [Op.notLike]: '%progres'
                    }
                },
                order: [['CereriProduse.updatedAt', 'DESC']]
            }
            ]
        }]
    }).then((data) => {
        res.send(data)
    })
}

exports.getAllBusinessItemsForRequest = async (req, res) => {
    const requestedItemsIds = [];

    await CereriProduse.findAll()
        .then(data => {
            data.forEach(element => {
                requestedItemsIds.push(element.item_id_fk)
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

    await ProdusListat.findAll({
        where: {
            id: {
                [Op.notIn]: requestedItemsIds
            },
            isActive: 1,
            expiringDate: {
                [Op.gte]: new Date()
            }
        },
        include: [{
            model: Adrese,
            as: "food_listing_add",
        },
        {
            model: User,
            as: "food_listing",
            include: [{
                model: BusinessUsers,
                as: "business_users",
                required: true,

            }
            ]
        }]
    }).then((data) => {
        res.send(data)
    })
}

exports.inserareCerereVoluntar = async (req, res) => {
    const selectedItems = req.body.selectedItems;
    const userId = req.body.id;
    let volunteerid;

    console.log(userId)

    await Volunteer.findOne({
        where: {
            user_id_fk: userId
        }
    }).then((data) => {
        volunteerid = data.dataValues.id;
    })

    var allData = [];
    selectedItems.forEach(async element => {
        let elementId = element.id;
        let businessUserId = element.food_listing.business_users.id
        let status = 'In progres'
        await CereriProduse.create({
            buser_id_fk: businessUserId,
            volunteer_id_fk: volunteerid,
            item_id_fk: elementId,
            status_cerere: status
        }).then((data) => {
            Array.prototype.push.apply(allData, data);

        })
    });
    res.send(allData)
}

exports.getVolunteerRequests = async (req, res) => {
    const userId = req.params.id;

    await User.findByPk(userId, {
        attributes: ['email', 'phone'],
        include: [{
            model: Volunteer,
            as: "volunteer_users",
            include: [
                {
                    model: CereriProduse,
                    as: "cereri_produse_volunteer",
                    include: [{
                        model: BusinessUsers,
                        as: "cereri_produse_business",
                    },
                    {
                        model: ProdusListat,
                        as: "items_cereri_produse",
                        include: [{
                            model: Adrese,
                            as: "food_listing_add",

                        }]
                    }]
                }
            ]
        }]
    }).then((data) => {
        res.send(data)
    })
}

exports.setDataRidicareCerere = async (req, res) => {
    const data = req.body.data;
    const cerereId = req.body.id;
    await CereriProduse.update(
        {
            timp_ridicare: data
        }, {
        where: {
            id: cerereId
        }
    }).then((data) => res.send(data))

}

exports.adaugaRecenzie = async (req, res) => {
    const body = req.body
    await Reviews.create(body).then(data => {
        res.send('Review added')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating review"
        })
    });
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

exports.countItemsByMonthYear= async (req,res) => {
    const userId = req.body.id;
    await ProdusListat.findAll({
        where:{
            user_id_fk : userId
        },
        attributes:  [[sequelize.fn('COUNT', sequelize.col('id')), 'n_id'], [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],[sequelize.fn("YEAR", sequelize.col("createdAt")), "year"]],
        group: ['month','year']
    }).then((data)=>{
        res.send(data)
    })
}

exports.nrSolicitariAprobate = async (req,res) => {
    const userId = req.params.id;
    let vUserId;
    await User.findByPk(userId, {
        attributes: [],
        include: [{
            model: Volunteer,
            as: "volunteer_users",
            attributes: ["id"]
        }]
    }).then((data) => {
        if(data.dataValues.volunteer_users != null) {
            console.log(data)
            vUserId = data.dataValues.volunteer_users.id
        }else{
            return;
        }
        
    })
    await CereriProduse.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'n_id'],],
        where: {
            [Op.and]: [{
                status_cerere: {
                    [Op.ne]: 'In progres'
                }
            },
            {
                volunteer_id_fk: {
                    [Op.eq]: vUserId
                }
            }
            ]
        }
    }).then((data) => res.send(data[0]));

}

//3. Define the query for the model