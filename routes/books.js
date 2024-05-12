const express = require("express");
 
const { 
    getAllBooks, 
    getBookById, 
    getAllIssuedBooks, 
    addNewBook, 
    updateBookById
} = require("../controllers/book-controller"); 

const { UserModel, BookModel } = require("../models/index");

const router = express.Router();

/*
* Route: /
*Methods : GET
*Description: Get all books 
*Access: Public
* Parameters:None
*/
router.get("/", getAllBooks);

/**
*Route: /books/:id
*Methods : GET
*Description: Get book by their id
*Access: Public
*Parameters: id
**/
router.get("/:id",getBookById);

/*
* Route: /books
* Methods : POST
* Description: adding a new book 
* Access: public
* Parameters:None
* data: id, name, Author, genre, price, publisher
*/
 router.post("/", addNewBook);

/*
* Route: /books/issued
*Methods : GET
*Description: get all issued books
*Access: Public
* Parameters: none
*/
router.get("/issued/by-user",getAllIssuedBooks);

/*
* Route: /updateBook/:id
*Methods : PUT
*Description: updating a book by their id
*Access: Public
* Parameters: id
* data: id, name, Author, genre, price, publisher
*/
router.put("/updateBook/:id", updateBookById);


module.exports = router;