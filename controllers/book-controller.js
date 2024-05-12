const BookModel  = require("../models/book-model");
const UserModel  = require("../models/user-model");

const IssuedBook = require("../DTO/book-dto");

exports.getAllBooks = async (req,res) => {
    const books = await BookModel.find();
    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "no book found"
        });
    }
    res.status(200).json({
        success: true,
        message: "book found.",
        data: books,
    });
}

exports.getBookById = async (req,res) => {
    const {id} = req.params;
    const book = await BookModel.findById((id));

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
}

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: {
            $exists: true
        }
    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new IssuedBook(each));

    if(issuedBooks.length === 0){
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
}

exports.addNewBook = async (req, res) => {
    const  { data } = req.body;
    if(!data){
        return res.status(400).json({
            success: false,
            message: "No data to be add a book!"
        });
    }
    try{
        await BookModel.create(data);
        const allBooks = await BookModel.find();
        return res.status(200).json({
            success: true,
            message: " Added book success.",
            data: allBooks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to add a book.",
        });
    }
};

exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updateBook = await BookModel.findOneAndUpdate(
        {_id: id}, 
        {$set:{...data}},
        {new: true},
    );
    return res.status(200).json({
        success: true,
        message: "Update a book by their id.",
        data: updateBook,
    });
}