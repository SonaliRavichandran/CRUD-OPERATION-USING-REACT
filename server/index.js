const express= require("express");
const users=require("./data.json");
const app=express();
const cors=require("cors")
const fs=require("fs")
const port=8000;

app.use(express.json());

app.use(cors(
    {
        origin:"http://localhost:5173",
        methods:["GET","POST","PATCH","DELETE"],
    }
));
//Display all users
app.get("/users",(req,res)=>{
    return res.json(users);
})

//Delete user detail
app.delete("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let filteredUsers=users.filter((user)=>user.id!==id)
    fs.writeFile("./data.json",JSON.stringify(filteredUsers),(err,data)=>{
        return res.json(filteredUsers);
    })
})


//Add new user
    app.post("/users",(req,res)=> {
    let{ name,age,city}=req.body;
    if(!name|| !age || !city)
    {
        res.status(400).send({message:"All Fields Required"})
    }
    let id=Date.now();
    users.push({id,name,age,city})

    fs.writeFile("./data.json", JSON.stringify(users),
    (err,data) =>
    {
        return res.json({message:"User details added Successfully"})

    })
    })

//update user

    app.patch("/users/:id",(req,res)=> {
    let id= Number(req.params.id)
    let{ name,age,city}=req.body;
    if(!name|| !age || !city)
    {
        res.status(400).send({message:"All Fields Required"})
    }
    let index=users.findIndex((user)=>user.id==id)

    users.splice(index,1,{...req.body})

    fs.writeFile("./data.json", JSON.stringify(users),
    (err,data) =>
    {
        return res.json({message:"User details updated Successfully"})

    })
    })

app.listen(port,(err)=>{
    console.log(`App is running in port ${port}`);
})