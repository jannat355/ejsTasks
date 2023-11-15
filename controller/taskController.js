const Tasks = require('../model/taskModel')

const create_task = async(req,res)=>{
    // console.log(req.body);
    const newTask = new Tasks(req.body)
    try{
        await newTask.save();
        res.status(201).redirect('/')
    }catch(error){
        console.log(error);
    }
}

const delete_task =async(req,res)=>{
    const id = req.params.id;
    try{
        await Tasks.findByIdAndDelete(id);
        res.redirect('/')
    }catch(error){
        console.log(error);
    }
}
const edit_task =async(req,res)=>{
    const id = req.params.id;
    try{
        await Tasks.findByIdAndUpdate(id); 
        res.redirect('/tasks')
    }catch(error){
        console.log(error);
    }
}

const single_page =async(req,res)=>{
    const id = req.params.id
    console.log(id);
    try{
      const result = await Tasks.findById(id)
       res.status(200).render('Single',{title:'Single || Page',task:result})
    }catch(error){
        console.log(error);
    }
}

module.exports ={create_task,delete_task,single_page,edit_task}
    
    