const express = require("express"); 
const projectsRouter = require("./src/projects/projects");

const server = express() 

const port = 3003; //port number can be changed but also in .env

server.use(express.json()); 

server.use('/projects', projectsRouter)

server.listen(port, () => { //port number and a callback, server run and listen to port
    console.log(`Howdy! Your Server is running on port ${port}`); //`${can change port number}`
});