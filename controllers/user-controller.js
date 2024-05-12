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

exports.getSubcriptionDetailsById = async (req,res) =>{
    const {id} = req.params;

    const user = await UserModel.find({_id:id});
    if(!user){
        return res.status(404).json({
            success: false,
            message: "users not exist for any subscription with id",
        });
    }
    // const getDateInDays = (data = "") => {
    //     let date;
    //     if(data === ""){
    //         date = new Date();
    //     }
    //     else{
    //         date = new Date(data);
    //     }
    //     let days = Math.floor(date / (1000 * 60 * 60 * 24));
    //     return days;
    // };
    
    // const SubscriptionType = (date) =>{
    //     if( (user.subscriptionType) === "Basic"){
    //         date = date + 90;
    //     }
    //     else if( (user.subscriptionType) === "Standard"){
    //         date = date + 180;
    //     }
    //     if( (user.subscriptionType) === "Premium"){
    //         date = date + 365;
    //     }
    //     return date;
    // };
    
    // //Jan 1 1970 UTC
    // let returnDateInDays = getDateInDays(user.returnDate);
    // let currentDateInDays = getDateInDays();
    // let subscriptionDateInDays = getDateInDays(user.subscriptionDate);
    // let subscriptionExpiry = SubscriptionType(subscriptionDateInDays);
    // const data = {
    //     ...user,
    //     isSubscriptionExpired : subscriptionExpiry <= currentDateInDays,
        
    //     daysLeftForExpiration : 
    //     subscriptionExpiry <= currentDateInDays 
    //     ? 0 
    //     : subscriptionExpiry - currentDateInDays,
        
    //     fine :
    //         returnDateInDays < currentDateInDays
    //         ? subscriptionExpiry <= currentDateInDays
    //         ? 100
    //         : 50
    //         : 0,
    // };

    return res.status(200).json({
        success: true,
        message: "Subscription detail for the user is:",
        data,
    });
    
};