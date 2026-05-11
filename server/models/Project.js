// din lab 9
const mongoose = require('mongoose');
 
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tech: { type: String, required: true },
    done: { type: Boolean, default: false },
    status: { 
        type: String, 
        enum: ['in-lucru', 'finalizat', 'in-lucru-2027'], 
        default: 'in-lucru' 
    },
});
 
const Project = mongoose.model('Project', projectSchema);
 
module.exports = Project;