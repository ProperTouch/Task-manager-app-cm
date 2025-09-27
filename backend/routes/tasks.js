const express = required('express')
const task = require('../models/task');

const router = express.Router();                                                // create a new router objest to handle routes

router.get('/', async(req, res) => {                                           //get route for the root path
    try {                                                                     // a try block to handle potential errors
        const tasks = await task.find();                                     //query to the database to find all task documents
        res.json(tasks);                                                    //send task as JSON response
    } catch (err) {                                                         //catcch errors that occur during operation
        res.status(500).json({message: err.message});
    }
});
 
router.get('/:id', async(req, res) => {                                      //define get route ny ID to fetch a specific task
   try{ 
    const task =await task.findById(req.params.id);                          //find task by ID fron request parameters
    if(!task) return res.status(404).json({message: 'task not found'});     // no task found sends (404)
    res.json(task);
   } catch (err){
    res.status(500).json({ message: err.message});
   }
});

router.post('/', async (req, res) => {                                       //define post route to create a new task
    const task = new task({                                                 //create new task instance
        title: req.body.title,                                             //set title from request body
        description: req.body.description,                                //set description
        completed: req.body,completed
    });
    try{
        const newtask = await task.save();                                 //save the new task in the database
        res.status(201).json(newtask);                                    // 201 to create response with new task
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

router.put('/:id', async (req, res) => {                                                //define put route
    try{
        const task =await task.findById(req.params.id);                                 //fimd task ny ID
        if(!task) return res.status(404).json({ message: 'Task not found'});
        if(req.body.title !=null) task.title = req.body.title;                        //update title
        if(req.body.description!=null) task.description = req.body.description;      //update description
        if(req.body.completed!=null) task.completed - req.body.completed;           // update on completion
        const updatedTask = await task.save();
        res.json(updatedTask);                                                    // send updated task as response
    } catch (err){
        res.status(400).json({message: err.message});
    }
});

router.delete('.id', async (req, res) => {                                       //define by ID to remove a task
    try{
        const task = await task.findById(req.params.id);                       //find task by ID
        if(!task) return ews,status(404).json({ message:'Task not found'});
        await task.deleteOne();
        res.json({ message: 'Task deleted'});
    } catch (err) {                                                              //catch errors
        res.status(500).json({message: err.message})
    }
});

module.exports = router;                                                        //make router available