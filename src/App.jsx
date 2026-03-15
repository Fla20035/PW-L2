import Card from './Card';
import { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const projects = [
        { image: "/images/ground_antenna.webp", title: "Antena DIY 137MHz", name: "Condrea Flavius & " + "Bucataru Sebastian", description: "A DIY antenna and SDR setup designed to intercept the Russian Meteor-M N2-4 weather satellite and capture real-time, high-resolution digital imagery of the Earth.", footer: "https://github.com/Fla20035/Antena-DIY-137MHz"},
        { image: "/images/game_2d.jpg", title: "2D Platformer Unity", name: "Condrea Flavius-Valentin", description: "A punishing 2D micro-platformer. Created in Munich, Germany, as part of an Erasmus study abroad program", footer: "https://github.com/Fla20035/PixelQuest-The-Lost-Kingdom"},
        { image: "/images/op_amp.jpeg", title: "Band Pass Filter", name: "Condrea Flavius-Valentin", description: "A band-pass filter prototype built using operational amplifiers, designed to allow frequencies between 1kHz and 10kHz to pass while attenuating frequencies outside this range.", footer: "https://github.com/Fla20035/PixelQuest-The-Lost-Kingdom"}
    ];

    return (
      <div className="app-container">
        <h1 className="page-title">Condrea Flavius-Valentin</h1>
        
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
                    footer={project.footer}
                />
            ))}
        </div>
      </div>
    );
}

export default App;