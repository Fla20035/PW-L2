import { useState, useEffect } from 'react';
import '../Styles/ProjectsList.css';

function ProjectsList() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');


    useEffect(() => {
        fetch('/data/projects.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Eroare de rețea!');
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch((err) => {
                setError('Eroare la incarcarea datelor ' + err.message);
                setLoading(false);
            });
    }, []);

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
            <h3 className="fetch-title">Proiecte din JSON</h3>

            <input 
                type="text" 
                className="search-input"
                placeholder="Caută un proiect..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="fetch-list">
                {filteredProjects.map((project) => (
                    <li key={project.id} className="fetch-item">
                        <div>
                            <strong>{project.title}</strong>
                            <span className="tech-badge">{project.tech}</span>
                        </div>
                        <span className={`status-badge ${project.done ? 'done' : 'progress'}`}>
                            {project.done ? 'Finalizat' : 'În lucru'}
                        </span>
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
