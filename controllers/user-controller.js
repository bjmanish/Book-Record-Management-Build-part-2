const UserModel = require("../models/user-model");
const BookModel = require("../models/book-model");

const IssuedBook = require("../DTO/book-dto");

exports.getAllUsers = async (req,res) => {
    
    const users = await UserModel.find();
    
    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "no users found in the db !",
        });
    }
    res.status(200).json({
        success: true,
        data: users,
    });
};

exports.getUserById = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById({_id:id});
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User doesnot exist !",
        });
    }
    return res.status(200).json({
        success : true,
        message : "user exist",
        data : user
    }); 
};

exports.createNewUser = async (req, res) => {
    const  { data } = req.body;
    if(!data){
        return res.status(400).json({
            success: false,
            message: "No data to be add a user!"
        });
    }
    try{
        await UserModel.create(data)
        const allUsers = await UserModel.find();
        return res.status(200).json({
            success: true,
            message: "user added success",
            data: allUsers,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to create a user.",
        });
    }
}

exports.updateUserData = async (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const updateUserData = await UserModel.findByIdAndUpdate(
        {_id:id}, 
        {$set:{...data}}, 
        {new:true}
    );
    return res.status(200).json({
        success: true,
        message: "user updated success.",
        data: updateUserData,
    });
};

exports.deleteUser = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.deleteOne({_id:id});
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User doesnot Exist!",
        });
    } 
    return res.status(200).json({
        success: true,
        message: "user deleted success.",
    });
};
