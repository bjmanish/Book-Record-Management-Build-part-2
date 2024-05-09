const express = require("express");

const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {getAllBoooks} = require("../controllers/book-controller");

const BookModel = require('../models/book-model');
const UserModel = require('../models/user-model');

const router = express.Router();


/*
* Route: /
*Methods : GET
*Description: Get all books 
*Access: Public
* Parameters:None
*/
//http://localhost:8081/books
router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data: books,
    });
});


/**
*Route: /books/:id
*Methods : GET
*Description: Get book by their id
*Access: Public
*Parameters: id
**/
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((book_id) => book_id.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "book not found!",
        });
    }
    return res.status(200).json({
        success: true,
        message: "books found.",
        data: book,
    });
});

/*
* Route: /books
* Methods : POST
* Description: adding a new book 
* Access: public
* Parameters:None
* data: id, name, Author, genre, price, publisher
*/
router.post("/",(req,res)=>{
    //const {id, name, Author, genre, price, publisher } = req.body;
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            success: false,
            message: "No data to add a book!"
        });
    }
    const book = books.find((book_id) => book_id.id === data.id);
    if(book){
        return res.status(200).json({
            success : false,
            message: "Book_Id already exists!",
        });
    }
    const allBooks = [...books,data];
    //books.push({id, name, Author, genre, price, publisher});
    return res.status(201).json({
        success: true,
        message: "book added success",
        data: allBooks,
    });
});

/*
* Route: /books/issued
*Methods : GET
*Description: get all issued books
*Access: Public
* Parameters: none
*/
router.get("/issued/by-user",(req,res) =>{
    const usersWithIssuedBooks = users.filter((each) => {
        
        if(each.issuedBooks){
            return each;
        }
    });
    const issuedBook = [];
    usersWithIssuedBooks.forEach((each) =>{
        const book = books.find((book_id) => (book_id.id === each.issuedBooks));
        
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBook.push(book);
    });
    if(issuedBook.length == 0){
        return res.status(404).json({
            success: false,
            message: "no books have been issued yet. ",
        });
    }
    return res.status(200).json({
        success: true,
        message: "users with the issued books.",
        data: issuedBook,
    });
});

/*
* Route: /updateBook/:id
*Methods : PUT
*Description: updating a book by their id
*Access: Public
* Parameters: id
* data: id, name, Author, genre, price, publisher
*/
router.put("/updateBook/:id", (req,res) =>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((Book_id) => Book_id.id === id);
    if(!book){
        return res.status(400).json({
            success: false,
            message: "book not exist for this id",
        });
    }
    const updateBook = books.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data
            }
        }
        return each;
    });
    return res.status(201).json({
        success: true,
        message: "book data updated success.",
        data: updateBook,
    });

});

/*
* Route: /books/issued/WithFine
*Methods : GET
*Description: get issued book with fine
*Access: Public
* Parameters: none
*/
router.get("/issued/WithFine", (req,res) =>{

});

module.exports = router;