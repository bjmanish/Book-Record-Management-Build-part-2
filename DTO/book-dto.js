//Data Transfer Object - Book
class IssuedBook {
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    //whenever we create object the constructor gets invoked parameterized constructor
    constructor(user){
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.issuedBook.issuedBy;
        this.issuedDate = user.issuedBook.issuedDate;
        this.returnDate = user.issuedBook.returnDate;
    }
}

module.exports = IssuedBook;