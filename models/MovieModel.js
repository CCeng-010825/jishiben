const mongoose=require('mongoose')
let MovieSchema=new mongoose.Schema({
    name:String,
    director:String
})
let MovieModel=mongoose.model('movies',MovieSchema)
module.exports=MovieModel