import { useState, useEffect } from 'react';
import '../Styles/ProjectsList.css';

function ProjectsList() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    // Stări noi pentru formularul de adăugare
    const [newTitle, setNewTitle] = useState('');
    const [newTech, setNewTech] = useState('');
    const [newStatus, setNewStatus] = useState('in-lucru');

    // Stări noi pentru formularul de EDITARE
    const [editingId, setEditingId] = useState(null); 
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

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

// Funcția pentru Ștergere proiect cu confirmare (DELETE) - Exercițiul 3
    async function handleDelete(id) {
        // Deschidem fereastra de confirmare (returnează true sau false)
        const sigurDoreste = window.confirm('Sigur doriți să ștergeți acest proiect?');
        
        // Dacă utilizatorul a apăsat "Cancel" (Anulează), oprim funcția aici și nu mai ștergem
        if (!sigurDoreste) {
            return;
        }

        try {
            await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'DELETE',
            });
            // Tăiem proiectul șters din listă doar dacă serverul l-a șters cu succes
            setProjects(projects.filter((p) => p._id !== id));
        } catch (err) {
            console.error('Eroare la ștergere:', err);
            alert('A apărut o eroare la ștergerea proiectului.');
        }
    }

// Funcția pentru schimbarea circulară a statusului (PUT) 
    async function handleToggle(project) {
        let nextStatus = 'in-lucru';
        let nextDone = false;

        // Logica de rotație între cele 3 stări:
        if (project.status === 'in-lucru') {
            nextStatus = 'in-lucru-2027';
            nextDone = false;
        } else if (project.status === 'in-lucru-2027') {
            nextStatus = 'finalizat';
            nextDone = true;
        } else if (project.status === 'finalizat') {
            nextStatus = 'in-lucru';
            nextDone = false;
        }

        try {
            const response = await fetch('http://localhost:3000/api/projects/' + project._id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    done: nextDone,
                    status: nextStatus 
                }) 
            });
            
            if (!response.ok) {
                alert('Eroare la salvarea noului status în server!');
                return;
            }

            const updatedProject = await response.json(); 
            
            // Actualizăm lista din React ca să vedem schimbarea instant
            setProjects(projects.map(p => p._id === project._id ? updatedProject : p)); 
        } catch (err) {
            console.error(err);
            alert('Eroare de rețea la schimbarea statusului.');
        }
    }

    // Funcția care declanșează modul de editare
    function startEditing(project) {
        setEditingId(project._id); // Reținem ID-ul [cite: 28]
        setEditTitle(project.title); // Populam input-ul cu titlul actual 
        setEditTech(project.tech); // Populam input-ul cu tech-ul actual 
    }

    // Funcția pentru butonul de "Anulează"
    function cancelEditing() {
        setEditingId(null); // Ieșim din modul de editare [cite: 33]
        setEditTitle('');
        setEditTech('');
    }

// Funcția care trimite modificările de titlu și tehnologie la server (PUT) - Exercițiul 2
    async function handleSaveEdit(id) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: editTitle, 
                    tech: editTech 
                }) // Trimitem noile valori scrise de utilizator
            });

            if (!response.ok) {
                alert('Eroare la salvarea modificărilor în baza de date!');
                return;
            }

            const updatedProject = await response.json();
            
            // Actualizăm proiectul editat în state-ul local din React
            setProjects(projects.map(p => p._id === id ? updatedProject : p));
            
            // Închidem modul de editare (revenim la cardul normal)
            setEditingId(null);
        } catch (err) {
            console.error('Eroare la procesul de editare:', err);
            alert('Eroare de rețea la salvare.');
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
                        {editingId === project._id ? (
                            /* --- MODUL DE EDITARE (FORMULARUL) --- */
                            <div className="edit-mode-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                <input 
                                    type="text" 
                                    value={editTitle} 
                                    onChange={(e) => setEditTitle(e.target.value)} 
                                    className="form-input"
                                />
                                <input 
                                    type="text" 
                                    value={editTech} 
                                    onChange={(e) => setEditTech(e.target.value)} 
                                    className="form-input"
                                />
                                <div className="action-container" style={{ marginTop: '10px' }}>
                                    <button onClick={() => handleSaveEdit(project._id)} className="btn-add" style={{ padding: '5px 10px' }}>
                                        Salvează
                                    </button>
                                    <button onClick={cancelEditing} className="btn-delete" style={{ padding: '5px 10px', backgroundColor: '#6c757d' }}>
                                        Anulează
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* --- MODUL NORMAL DE AFIȘARE --- */
                            <>
                                <div>
                                    <strong>{project.title}</strong>
                                    <span className="tech-badge">{project.tech}</span>
                                </div>
                                
                                <div className="action-container">
                                    {(() => {
                                        const statusDisplay = getStatusDisplay(project);
                                        return (
                                            <span 
                                                className={`status-badge ${statusDisplay.className}`}
                                                onClick={() => handleToggle(project)}
                                                style={{ cursor: 'pointer' }}
                                                title="Apasă pentru a schimba statusul"
                                            >
                                                {statusDisplay.text}
                                            </span>
                                        );
                                    })()}
                                    
                                    {/* BUTONUL NOU DE EDITARE */}
                                    <button 
                                        onClick={() => startEditing(project)}
                                        className="btn-add"
                                        style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                                    >
                                        Editează
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(project._id)}
                                        className="btn-delete"
                                    >
                                        Șterge
                                    </button>
                                </div>
                            </>
                        )}
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