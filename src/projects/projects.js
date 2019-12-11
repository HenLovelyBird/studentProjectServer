const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const filePath = path.join(__dirname, "projects.json");
const {validationResult, sanitize} = require("express-validator");

// Bodies, params and queries must be validated with express-validator middleware


const readFile = filePath => {
    const buffer = fs.readFileSync(filePath);
    const fileContent = buffer.toString();
    return (JSON.parse(fileContent));
};
//req for projects i all
router.get('/', (res) => {
    const projectsArray = readFile(filePath);
    res.send(projectsArray);
});
//READ http://localhost:3000/projects/ to GET all the projects

// req for particular project id number
router.get('/:id', [sanitize ('ID').toInt()], (req, res) => {
    const projectsArray = readFile(filePath);
    const findproject = projectsArray.find(
        project => project.ID === req.params.id
    );
    // console.log(req.params.id);
    if (findproject){
        res.send(findproject);
    } else {
        res.status(401).send(`project ${req.params.id} not found!`);
    }
});// READ http://localhost:3000/projects/1 to GET a single user by id

router.post('/', (req,res) => {  //in this POST I want to receive the entire obj array for a particular id and append it
    const projectsArray = readFile(filePath);
    const newproject = {
        ...req.body, 
        // {
        //     "Name":"Andie Plankerton",
        //     "Description":"sharing server space in small groups",
        //     "Creation Date": 22112020,
        //     "ID": 6,
        //     "RepoURL":"github",
        //     "LiveURL":"http://localhost:3000",
        //     "StudentID": 6,
        //     "Number of Projects": 442
        // }
        NumberOfProjects: Number()
    };
    projectsArray.push(newproject);
    fs.writeFileSync(filePath, JSON.stringify(projectsArray));
    res.status(201).send(`${newproject.ID}`);
});// CREATE http://localhost:3000/projects/ to POST a single user


router.put('/:id', (req, res)=> {
    const modifyproject = req.body;
    const projectsArray = readFile(filePath);
    projectsArray[req.params.id -1] = modifyproject; //-1?
    fs.writeFileSync(filePath, JSON.stringify(projectsArray));
    res.send(modifyproject);
});// PUT http://localhost:3000/projects/ID to UPDATE a single user

router.delete('/:id', (req, res) => {
    const projectsArray = readFile(filePath);
    const keepprojects = projectsArray.filter(project => project.ID !== req.params.id);
    fs.writeFileSync(filePath, JSON.stringify(keepprojects));
    res.status(204);
}); // DELETE http://localhost:3000/projects/ to DELETE a single user


module.exports = router;