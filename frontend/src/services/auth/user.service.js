import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";


const userCount = () => {
    return axios
        .get(API_URL + "count")
        .then((response) => {
            return response.data
        });
};

const volunteerCount = () => {
    return axios
        .get(API_URL + "countVolunteers")
        .then((response) => {
            return response.data
        });
};

const countReservedItems = () => {
    return axios
        .get(API_URL + "countReservedItems")
        .then((response) => {
            return response.data
        });
}

const getCategories = () => {
    return axios
        .get(API_URL + "categories")
        .then((response) => {
            return response.data
        })
}

const getUserAddresses = (userId) => {
    return axios
        .get(API_URL + `user/${userId}/addresses`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.message
        })
}

const postFoodListing = (user, title, description, state, image, quantity, units, category, expiringDate, pickupInterval, selectedAdress, price, isDonating, lat, long) => {
    return axios
        .post(API_URL + '/listing-food-item', {
            user,
            title,
            description,
            state,
            image,
            quantity,
            units,
            category,
            expiringDate,
            pickupInterval,
            selectedAdress,
            price,
            isDonating,
            lat,
            long
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            return err.message
        })
}

const getAllProducts = () => {
    return axios
        .get(API_URL + '/items')
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const updateUser = (idUser, firstName, lastName, phone, email, image) => {
    return axios
        .put(API_URL + '/user/' + idUser, {
            firstName,
            lastName,
            phone,
            email,
            image,

        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const insertAddress = (idUser, strada, numar, oras) => {
    return axios
        .post(API_URL + '/user/' + idUser + '/addresses', {
            strada,
            numar,
            oras
        }).then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const deleteAddress = (idAddress) => {
    return axios
        .delete(API_URL + '/user/addresses/' + idAddress)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getAllUserItems = (idUser) => {
    return axios
        .get(API_URL + '/listing-food-items/user/' + idUser)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getAddressById = (addrId) => {
    return axios
        .get(API_URL + 'user/address/' + addrId)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const activateItem = (id, isActive) => {
    const active = isActive == 0 ? 1 : 0;
    return axios
        .post(API_URL + 'user/listing-food-items/' + id, {
            active
        }).then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getUserReservedItems = (userId) => {
    return axios
        .get(API_URL + 'user/' + userId + '/my-reservations')
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const deleteReservedItem = (itemId) => {
    return axios
        .delete(API_URL + 'user/remove-reserved-item/' + itemId)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getUserById = (userId) => {
    return axios
        .get(API_URL + 'user/' + userId)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getAllActiveItems = (category) => {
    return axios
        .post(API_URL + 'all-items-for-reserve', {
            category
        })
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getMainCategories = () => {
    return axios
        .get(API_URL + 'main-categories')
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getItemDetailsById = (id) => {
    return axios
        .get(API_URL + 'item-for-reserve/' + id)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const reserveItem = (userId, itemId) => {
    return axios
        .post(API_URL + 'user/' + userId + '/item-reserve/' + itemId)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getBusinessUserDetails = (id) => {
    return axios
        .get(API_URL + 'user/' + id + '/business-user')
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getCereriBusinessUser = (id) => {
    return axios
        .get(API_URL + 'business-user/' + id + '/requests')
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const approveCerere = (id, status) => {
    return axios
        .post(API_URL + 'request-approval', {
            id: id,
            status: status
        })
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const countNewRequestsToday = (id) => {
    return axios
        .get(API_URL + 'number-today-requests/' + id)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getAllListedItemsBusiness = (id) => {
    return axios
        .get(API_URL + 'listing-food-items/user-business/' + id)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const approvedListedItemsBusiness = (id) => {
    return axios
        .get(API_URL + 'see-my-approved-items/' + id)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getAllBusinessItemsForRequest = () => {
    return axios
        .get(API_URL + 'getAllBusinessItemsForRequest')
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const inserareCerereVoluntar = (selectedItems, id) => {
    return axios
        .post(API_URL + 'inserare-cerere-voluntar', {
            selectedItems: selectedItems,
            id: id
        })
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getVolunteerRequests = (id) => {
    return axios
        .get(API_URL + 'getVolunteerRequests/' + id)
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const setDataRidicareCerere = (data, id) => {
    return axios
        .post(API_URL + 'seteaza-data-ridicare', {
            data: data,
            id: id
        })
        .then(response => {
            return response.data
        }).catch(err => {
            return err.message
        })
}

const getAllOrase = () => {
    return axios
    .get(API_URL + 'getAllOrase')
    .then(response => {
        return response.data
    }).catch(err => {
        return err.message
    })
}

const adaugaRecenzie = (titlu,descriere,user_id_fk) => {
    return axios
    .post(API_URL + 'adaugaRecenzie',{
        titlu: titlu,
        descriere: descriere,
        user_id_fk: user_id_fk
    })
    .then(response => {
        return response.data
    }).catch(err => {
        return err.message
    })
}

const getStatistics = (userId) => {
    return axios
    .post(API_URL + 'countItemsByMonthYear',{
        id: userId
    })
    .then(response => {
        return response.data
    }).catch(err => {
        return err.message
    })
}

const nrSolicitariAprobate = (id) => {
    return axios
    .get(API_URL + 'nrSolicitariAprobate/' + id)
    .then(response => {
        return response.data
    }).catch(err => {
        return err.message
    })
}

const UserService = {
    userCount,
    volunteerCount,
    getCategories,
    getUserAddresses,
    postFoodListing,
    getAllProducts,
    updateUser,
    insertAddress,
    deleteAddress,
    getAllUserItems,
    getAddressById,
    activateItem,
    getUserReservedItems,
    deleteReservedItem,
    getUserById,
    getAllActiveItems,
    countReservedItems,
    getMainCategories,
    getItemDetailsById,
    reserveItem,
    getBusinessUserDetails,
    getCereriBusinessUser,
    approveCerere,
    countNewRequestsToday,
    getAllListedItemsBusiness,
    approvedListedItemsBusiness,
    getAllBusinessItemsForRequest,
    inserareCerereVoluntar,
    getVolunteerRequests,
    setDataRidicareCerere,
    getAllOrase,
    adaugaRecenzie,
    getStatistics,
    nrSolicitariAprobate
};

export default UserService;