const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    title : {type:String,required:true},
    textItem : {type:String,required:true},
    tag : {type: String , required:true },
    userId:{type: String , required:true}
})

const todoModel = mongoose.model('todo',todoSchema)


module.exports={
    todoModel
}