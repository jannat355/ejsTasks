// Require mongoose
// from mongoose , we would use a method called schema. this defines the structure of the document that we would store in the collection model is used to wrap the schema and then sends it to the db

const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    }
},{timestamps:true})

// let create our model (model is what surrounds the schema and provides us with an interfaceby wich to communicate with our database)

const Tasks = mongoose.model('Task',taskSchema);
module.exports = Tasks
