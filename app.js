const express = require('express');
const app = express()
const port = process.env.PORT || 5050;
const morgan = require('morgan')
const mongoose = require('mongoose');
const connect = require('./db/mongoDB')
require('dotenv/config')
const Tasks =  require('./model/taskModel')




// custom middlewares
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    console.log('new request made');
    console.log('host : ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next()
})

// Testing our model and database
// .save() is a mongos method for saving data to our database
app.get('/post-tasks',async(req,res)=>{
   const testData = new Tasks({
    name:'timi',
    title:'node',
   task:'we just started using mongodb'
   })
   try{
       const newTasks = await testData.save();
        res.status(201).send(newTasks)
   }catch(error){
    console.log(error);
   }
})
// .find() method is a mongoose method for getting all our data from our database
app.get('/get-posts', async(req,res)=>{
    try{
        const getTasks = await Tasks.find();
        res.status(200).send(getTasks)
    }catch(error){
        console.log(error);
    }
})

// .findbyId() method is a mongoose method for finding a specific  data from our database
app.get('/single-task',async(req,res)=>{
    try{
         const singleTask =  await Tasks.findById("65522e792e678128133cbef6");
         res.status(200).send(singleTask)
    }catch(error){
        console.log(error);
    }
})
// end of testing our database
app.use( morgan('dev'))
app.use(express.static('public'))


//routes 
// app.get('/',(req,res)=>{
//     res.send('Welcome home')
// })
// const task = [
//     {name:'jannat',title:'Jannat clothings',task:'client deliveries this morning'},
//     {name:'jannat',title:'life as a working class woman',task:'working well'},
//     {name:'jannat',title:'life in school',task:'always doing assignment'},
// ]
// // api
app.post('/api/v1/create',async(req,res)=>{
    // console.log(req.body);
    const newTask = new Tasks(req.body)
    try{
        await newTask.save();
        res.status(201).redirect('/')
    }catch(error){
        console.log(error);
    }
});
app.get('/api/v1/route/:id',async(req,res)=>{
    const id = req.params.id
    console.log(id);
    try{
      const result = await Tasks.findById(id)
       res.status(200).render('Single',{title:'Single || Page',task:result})
    }catch(error){
        console.log(error);
    }
})
 
// page route
app .get ('/',async(req,res)=>{
    try{
        const result = await Tasks.find();
        res.render('index',{title:'Home || Page', task:result});
    }catch(error){
        console.log(error);
    }
    
})
app .get ('/about',(req,res)=>{
    res.render('about',{title:'About || Page'})
})
app .get ('/tasks',(req,res)=>{
    res.render('tasks',{title:'Task || Page'})
})

app.use((req,res)=>{
    res.render('404',{title:'Error || Page'})
})

// db connection
connect()
.then(() =>{
    try{
        app.listen(port,()=>{
            console.log(`Server conected to http://localhost:${port}`);
        })
    }catch(error){
        console.log('cannot connect to the server');
    }
})
.catch((error)=>{
    console.log('invalid database connection...!',error);
})

