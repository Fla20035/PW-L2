import { useState, useEffect } from 'react';
import '../Styles/ProjectsList.css';

function ProjectsList() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    // Stări noi pentru formularul de adăugare (Exercițiul 4)
    const [newTitle, setNewTitle] = useState('');
    const [newTech, setNewTech] = useState('');
    const [newStatus, setNewStatus] = useState('in-lucru');

    useEffect(() => {
        fetch('http://localhost:3000/api/projects')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Eroare de rețea!');
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Eroare la incarcarea datelor: ' + err.message);
                setLoading(false);
            });
    }, []);

    // Funcția pentru Adăugare proiect (POST) - Exercițiul 4
    async function handleAddProject(e) {
        e.preventDefault(); // Oprește reîncărcarea paginii la submit
        try {
            const response = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: newTitle, 
                    tech: newTech, 
                    status: newStatus,
                    done: newStatus === 'finalizat'
                })
            });
            const newProject = await response.json();
            
            // Actualizăm lista pe loc
            setProjects([...projects, newProject]);
            
            // Golim input-urile
            setNewTitle('');
            setNewTech('');
            setNewStatus('in-lucru');
        } catch (err) {
            console.error('Eroare la adaugare:', err);
        }
    }

    // Helper function pentru status display
    function getStatusDisplay(project) {
        if (project.status === 'finalizat') {
            return { text: 'Finalizat', className: 'done' };
        } else if (project.status === 'in-lucru-2027') {
            return { text: 'În lucru 2027+', className: 'future' };
        } else if (project.status === 'in-lucru') {
            return { text: 'În lucru', className: 'progress' };
        }
        // Fallback pentru proiectele vechi fără status
        return { 
            text: project.done ? 'Finalizat' : 'În lucru', 
            className: project.done ? 'done' : 'progress' 
        };
    }

    // Funcția pentru Ștergere proiect (DELETE) - Exercițiul 5
    async function handleDelete(id) {
        try {
            await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'DELETE',
            });
            // Tăiem proiectul sters din listă
            setProjects(projects.filter((p) => p._id !== id));
        } catch (err) {
            console.error('Eroare la stergere:', err);
        }
    }

    // Funcția pentru schimbarea statusului (PUT) - Exercițiul 1
    async function handleToggle(id, currentDone) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone }) 
            });
            
            const updatedProject = await response.json(); 
            
            setProjects(projects.map(p => p._id === id ? updatedProject : p)); 
        } catch (err) {
            console.error('Eroare la actualizare status:', err);
        }
    }

    if (loading) {
        return (
            <div className="projects-fetch-section">
                <p>Se incarca...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="projects-fetch-section">
                <p className="error-text">{error}</p>
            </div>
        );
    }

    const filteredProjects = projects.filter((proiectCurent) => 
        proiectCurent.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalProjects = projects.length;
    const finalizate = projects.filter(proiectCurent => proiectCurent.done).length;
    const inLucru = projects.filter(proiectCurent => !proiectCurent.done).length;

    return (
        <div className="projects-fetch-section">
            <h3 className="fetch-title">Proiecte din MongoDB</h3>

            {/* Formularul curățat, folosind noile clase CSS */}
            <form onSubmit={handleAddProject} className="add-project-form">
                <input 
                    type="text" 
                    placeholder="Titlu proiect nou..." 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Tehnologii (ex: React)..." 
                    value={newTech} 
                    onChange={(e) => setNewTech(e.target.value)} 
                    required 
                />
                <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="form-select"
                >
                    <option value="in-lucru">În lucru</option>
                    <option value="finalizat">Finalizat</option>
                    <option value="in-lucru-2027">În lucru 2027+</option>
                </select>
                <button type="submit" className="btn-add">Adaugă</button>
            </form>

            <input 
                type="text" 
                className="search-input"
                placeholder="Caută un proiect..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="fetch-list">
                {filteredProjects.map((project) => (
                    <li key={project._id} className="fetch-item">
                        <div>
                            <strong>{project.title}</strong>
                            <span className="tech-badge">{project.tech}</span>
                        </div>
                        
                        {/* Container-ul de acțiuni curățat */}
                        <div className="action-container">
                            {(() => {
                                const statusDisplay = getStatusDisplay(project);
                                return (
                                    <span 
                                        className={`status-badge ${statusDisplay.className}`}
                                        onClick={() => handleToggle(project._id, project.done)}
                                        style={{ cursor: 'pointer' }}
                                        title="Apasă pentru a schimba statusul"
                                    >
                                        {statusDisplay.text}
                                    </span>
                                );
                            })()}
                            <button 
                                onClick={() => handleDelete(project._id)}
                                className="btn-delete"
                            >
                                Șterge
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="stats-container">
                <p>Total: <strong>{totalProjects}</strong></p>
                <p>Finalizate: <strong className="text-success">{finalizate}</strong></p>
                <p>În lucru: <strong className="text-warning">{inLucru}</strong></p>
            </div>
        </div>
    );
}

export default ProjectsList;