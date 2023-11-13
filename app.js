const express = require('express');
const app = express()
const PORT = 5050;
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv/config')


const mongoDBUrl = process.env.DBURL
// custom middlewares
app.set('view engine','ejs')
app.use((req,res,next)=>{
    console.log('new request made');
    console.log('host : ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next()
})

app.use( morgan('dev'))
app.use(express.static('public'))


//routes 
// app.get('/',(req,res)=>{
//     res.send('Welcome home')
// })
const task = [
    {name:'jannat',title:'Jannat clothings',task:'client deliveries this morning'},
    {name:'jannat',title:'life as a working class woman',task:'working well'},
    {name:'jannat',title:'life in school',task:'always doing assignment'},
]

app .get ('/',(req,res)=>{
    res.render('index',{title:'Home || Page', task})
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
mongoose.connect(mongoDBUrl)
.then(() => console.log('Connected!'));

app.listen(PORT,()=>{
    console.log(`Server conected to http://localhost:${PORT}`);
})