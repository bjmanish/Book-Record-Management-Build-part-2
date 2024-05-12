const express = require("express");
const { 
    getAllUsers, 
    getUserById,
    createNewUser,  
    updateUserData, 
    deleteUser,   
    getSubcriptionDetailsById,  
} = require("../controllers/user-controller");

const router = express.Router();

const { UserModel , BookModel } = require('../models/index');

/*
* Route: /
*Methods : GET
*Description: Get all users info
*Access: Public
* Parameters:None
*/

router.get("/", getAllUsers);

/*
* Route: /:id
*Methods : GET
*Description: Get all single user by their id
*Access: Public
* Parameters:None
*/

router.get("/:id",getUserById);

/*
* Route: /
*Methods : POST
*Description: Create new user
*Access: Public
* Parameters: None
*/

router.post("/", createNewUser);

/*
* Route: /:id
*Methods : PUT
*Description: Updating user by their id
*Access: Public
* Parameters: ID
*/

router.put("/updateBook/:id", updateUserData);

/*
* Route: /:id
*Methods : DELETE
*Description: Deleting user by their id if not any issued books and no any fine
*Access: Public
* Parameters: ID
*/
router.delete("/:id", deleteUser);

/*
* Route:  /users/subscription-details/{id}
*Methods : GET
*Description: get all user subscription details
* Parameters: ID
*/

router.get("/subscription-details/:id",getSubcriptionDetailsById);

module.exports = router;