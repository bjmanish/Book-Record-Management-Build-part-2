const mongoose = require("mongoose");

const  bookSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    gener:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    publisher:{
        type: String,
        required: true,
    }
},
{ 
    timestamps: true,
}
);


module.exports = mongoose.model('Book', bookSchema);