const express = require("express");
const router = express.Router();
const controller = require("../controller/queries.controller");
const auth = require("../controller/auth.controller");

router.get("/", controller.findAll)
router.post("/", controller.create)
router.get("/user/:id", controller.findByID)
router.put("/user/:id", controller.upload, controller.update)
router.get("/user/:id/addresses", controller.getUserAddresses)
router.post("/user/:id/addresses", controller.createUserAddress)
router.delete("/user/addresses/:id", controller.deleteAddress)
router.get("/user/address/:id",controller.getAddressById)
router.post("/auth/signup", auth.signup)
router.post("/auth/login", auth.signin)
router.get("/count", controller.countUsers)
router.get("/countVolunteers", controller.countVolunteers)
router.get("/countReservedItems", controller.countReservedItems)
router.get("/categories", controller.getCategories)
router.get("/main-categories",controller.getMainCategories)
router.get("/categories/:id/subcategories", controller.getSubcategories)
router.post("/listing-food-item", controller.upload,controller.postFoodListing)
router.get("/listing-food-items/user/:id", controller.getAllUserItems)
router.get("/listing-food-items/user-business/:id", controller.getAllListedItemsBusiness)
router.get("/items/", controller.getAllItems)
router.post("/user/listing-food-items/:id",controller.activateListedItem)
router.get("/user/:id/my-reservations",controller.getUserReservedItems)
router.post("/all-items-for-reserve",controller.getUnreservedListedItems)
router.delete("/user/remove-reserved-item/:id",controller.deleteReservedItem)
router.get("/item-for-reserve/:id",controller.getItemDetailsById)
router.post("/user/:userId/item-reserve/:itemId",controller.createReservation)
router.get("/user/:id/business-user",controller.getBusinessUserDetails)
router.get("/business-user/:id/requests",controller.getCereriBusinessUser)
router.get("/number-today-requests/:id",controller.countNewRequestsToday)
router.post("/request-approval",controller.approveCerere)
router.get("/see-my-approved-items/:id",controller.approvedListedItemsBusiness)
router.get("/getAllBusinessItemsForRequest",controller.getAllBusinessItemsForRequest)
router.post("/inserare-cerere-voluntar",controller.inserareCerereVoluntar)
router.get('/getVolunteerRequests/:id', controller.getVolunteerRequests)
router.post('/seteaza-data-ridicare',controller.setDataRidicareCerere)
router.get('/getAllOrase',controller.getAllOrase)
router.post('/adaugaRecenzie',controller.adaugaRecenzie)
router.post('/countItemsByMonthYear',controller.countItemsByMonthYear)
router.get('/nrSolicitariAprobate/:id',controller.nrSolicitariAprobate)

module.exports = router;

//4. Define the routes