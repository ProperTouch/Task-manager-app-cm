const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({     // new Schema object created
    title:{
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: false
    },
    completed:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);  //create and export'Task' using defined schema