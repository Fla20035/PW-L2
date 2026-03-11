import Card from './Card';
import { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const projects = [
        { image: "/images/dumb_cat.png", title: "Proiect 1", name: "Condrea Flavius-Valentin", description: "Student UNITBV" },
        { title: "Proiect 2", name: "Condrea Flavius-Valentin", description: "Student UNITBV" },
        { title: "Proiect 3", name: "Condrea Flavius-Valentin", description: "Student UNITBV" },
    ];

    return (
      <div className="app-container">
        <h1 className="page-title">Dashboard</h1>
        
        <div className="counter-section">
            <p>Ai apăsat de {count} ori</p>
            <button className="primary-btn" onClick={() => setCount(count + 1)}>
                Click
            </button>
        </div>

        <hr className="divider" /> 

        <div className="cards-list">
            {projects.map((project, index) => (
                <Card 
                    key={index} 
                    image={project.image} 
                    title={project.title}
                    name={project.name}
                    description={project.description}
                />
            ))}
        </div>
      </div>
    );
}

export default App;