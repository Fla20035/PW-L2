import ProjectsList from '../ProjectsList';
import WeatherWidget from '../WeatherWidget';
import QuickNote from '../QuickNote';
import ToDoList from '../ToDoList';
import CPS from '../CPS';
import '../../Styles/QuickNote.css';
import '../../Styles/ToDoList.css';
import '../../Styles/Projects.css';

function Projects() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Proiectele mele</h1>
                <p className="page-subtitle">O colecție a lucrărilor mele din timpul facultății.</p>
            </div>
            
            <div className="projects-layout">
                <div className="projects-column">
                    <ProjectsList />
                </div>
                
                <div className="sidebar-column">
                    <CPS />
                    <QuickNote />
                    <ToDoList />
                </div>
            </div>
        </div>
    );
}

export default Projects;
