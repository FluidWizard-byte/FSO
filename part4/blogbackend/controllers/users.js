const { response } = require('express')
const User=require('../models/user')
const usersRouter=require('express').Router()
const bcrypt=require('bcryptjs')

usersRouter.get('/',async (request,response)=>{
    const users=await User.find({}).populate("blogs")
    response.json(users)
})

usersRouter.post('/',async (request,response)=>{
    const {username,name,password}=request.body
    const saltRounds=10
    const passwordHash=await bcrypt.hash(password,saltRounds)
    const user=new User({
        username,
        name,
        passwordHash,
    })

    const savedUser=await user.save()

    response.status(201).json(savedUser)
})

module.exports=usersRouter