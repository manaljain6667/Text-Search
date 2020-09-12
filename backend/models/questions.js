const mongoose = require('mongoose');
var questionSchema =new mongoose.Schema({
    query: {type:String, 
        required: true,
        },

	topic: {
        type:String, 
        required: true,
        },
    tags: [{
        type:String, 
        required: true
    }],},
    {
        timestamps: true,
      });

const QuestionModel = mongoose.model('questions', questionSchema);
module.exports=QuestionModel;