import ProjectsList from '../ProjectsList';

function Projects() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Proiectele mele</h1>
                <p className="page-subtitle">O colecție a lucrărilor mele din timpul facultății.</p>
            </div>
            <ProjectsList />
        </div>
    );
}

export default Projects;