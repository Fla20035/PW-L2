const Project = require('./models/Project');
const express = require('express');
const cors = require('cors'); // pt comunicare intre porturile de back si front (3000 si 5173)
const mongoose = require('mongoose');

const app = express();
app.use(cors()); // comunicare intre porturile de back si front (3000 si 5173)
app.use(express.json()); // comunicare intre back si front (pt a putea citi ce trimite frontul in body-ul requestului)
const PORT = 3000;

// mongusu legat la mongu 
mongoose.connect('mongodb://127.0.0.1:27017/dashboard')
    .then(function() {
        console.log('Conectat la MongoDB!');
    })
    .catch(function(err) {
        console.error('Eroare conectare MongoDB:', err);
    });

app.use(express.json());

// raspunde la GET pe ruta "/"
app.get('/', function(req, res) {
    res.json({
        message: 'Serverul functioneaza!'
    });
});


// POST /api/projects - adauga un proiect nou in MongoDB
app.post('/api/projects', async function(req, res) { //
    try { //
        
        const newProject = new Project({ //
            title: req.body.title, //
            tech: req.body.tech, //
            done: req.body.done || false, //
            status: req.body.status || 'in-lucru' //
        }); //

        const saved = await newProject.save(); //
        
        // verificare + daca respecta schema
        res.status(201).json(saved); //
    } catch (err) { //
        // cath err 
        res.status(400).json({ error: err.message }); //
    } //
});


app.get('/api/projects', async function(req, res) { // 
    try {
        
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});

// search după ID
app.get('/api/projects/:id', async function(req, res) {
    try {
        const project = await Project.findById(req.params.id); 
        if (!project) return res.status(404).json({ error: 'Proiectul nu a fost gasit' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Eroare la cautare ' + err });
    }
});

// delete după ID
app.delete('/api/projects/:id', async function(req, res) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id); 
        if (!deletedProject) return res.status(404).json({ error: 'Proiectul nu a fost gasit' });
        res.json({ message: 'Proiect sters cu succes!' });
    } catch (err) {
        res.status(500).json({ error: 'Eroare la ștergere ' + err});
    }
});

app.put('/api/projects/:id', async function(req, res) {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returnează documentul DUPĂ actualizare
        );

        if (!updated) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



// Porneste serverul
app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});