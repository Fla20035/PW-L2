const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
    res.json({
        message: 'Serverul functioneaza!'
    });
});

//GET /api/projects/:id - returneaza un proiect specific dupa ID
app.get('/api/projects/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({ error: 'Proiectul nu a fost găsit' });
    }
    
    res.json(project);
});

// GET /api/stats - returneaza statistici despre proiecte
app.get('/api/stats', function(req, res) {
    const total = projects.length;
    const done = projects.filter(p => p.done).length;
    const pending = total - done;

    res.json({ total, done, pending });
});


//POST /api/projects - adauga un nou proiect
// POST /api/projects
app.post('/api/projects', function(req, res) {
    const newProject = {
        id: projects.length + 1,
        title: req.body.title,
        tech: req.body.tech,
        done: req.body.done || false
    };
    
    projects.push(newProject);
    res.status(201).json(newProject); // 201 - Created
});

// DELETE /api/projects/:id - sterge un proiect dupa ID
app.delete('/api/projects/:id', function(req, res) {
    console.log('Received DELETE request for project with ID:', req.params.id);
    const id = parseInt(req.params.id);
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Proiectul nu a fost găsit' });
    }

    const deletedProject = projects.splice(index, 1);
    res.json(deletedProject[0]);
});

const projects = [{
        id: 1,
        title: "Antena DIY 137MHz",
        tech: "Radio, Signal Processing",
        done: false
    },
    {
        id: 2,
        title: "2D Platformer Unity",
        tech: "Unity, C#",
        done: true
    },
    {
        id: 3,
        title: "Band Pass Filter",
        tech: "Electronics, Op-Amps",
        done: true
    },
    {
        id: 4,
        title: "API Meteo",
        tech: "React, API",
        done: true
    },
];
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
    res.json(projects);
});




// Porneste serverul
app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});