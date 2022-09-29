require("dotenv").config();
const {Router} = require("express")
const bcrypt  = require("bcryptjs")
const jwt  = require("jsonwebtoken")
const {todoModel} = require("../model/todo.model.js")

const todoController = Router();

// GET TODOS
todoController.get("/", async(req,res)=>{
     const todos = await todoModel.find({userId:req.body.userId});
     res.send(todos)
})

// CREATE TODOS 
todoController.post("/create", async(req,res)=>{
    const {title,textItem,tag,userId} = req.body
    const todos = new todoModel({
       title,
       textItem,
       tag,
       userId
    })
    try{
     await todos.save()
     res.json({"msg":"Todo Created"})
    }
    catch{
     res.json({"msg":"Something went wrong, try again!"})
    }
})

// DELETE TODO
todoController.delete("/delete/:todoId", async(req, res) =>{
    const {todoId} = req.params;
    const deleteTodo = await todoModel.findOneAndDelete({_id : todoId, userId: req.body.userId});
    if(deleteTodo){
        res.json({"msg":"Deleted Successfully"})
    }
    else{
        res.json({"msg":"You are not the authorised owner!"})
    }
})

// UPDATE TODO
todoController.patch("/edit/:todoId", async(req, res) =>{
    const {todoId} = req.params;
    const {} = req.body;
    const updateTodo = await todoModel.findOneAndUpdate({_id : todoId, userId: req.body.userId},{ ...req.body});
    if(updateTodo){
        res.json({"msg":"Updated Successfully"})
    }
    else{
        res.json({"msg":"You are not the authorised owner!"})
    }
})

module.exports = {
    todoController
}       