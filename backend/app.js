const express = require ('express');                               // for framework and web applications
const mongoose = require ('mongoose');                            // for object modelling
const bodyParser = require ('body-parser');                        // to parse JSON request bodies
const cors = require ('cors');                                     // allows cross origin requests
const taskRoutes = require ('/routes/tasks'); 
require('dotenv').config(); 

const app = express();                                          // creating an instance for express

app.use(bodyParser.json())
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {                     //established a connection to the database
 useNewUrlParser: true,                                        //URL parser for MongoDB connection
 useUnifiedTopology: true                                     // topology engine for MongoDB
})

.then (() => console.log('Connected to MongoDB'))                 //success message if conection is established
.catch(err => console.error('MongoDB connection error:', err));    // error message if conection fails

app.use ('/tasks', taskRoutes);                                   // mounted task routes under '/task'

const PORT = 3000;
app.listen(PORT, () => {                                         //start listening for incoming requests
    console.log('Server running on port ${PORT}');              //for indicating the port is running
});
   