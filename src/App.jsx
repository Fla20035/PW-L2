import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './pages/Navbar';
import Card from './Card';
import QuickNote from './QuickNote';
import ToDoList from './ToDoList';
import { useState } from 'react';
import './App.css';
import ProjectsList from './ProjectsList';
import WeatherWidget from './WeatherWidget';
import ContactForm from './ContactForm';


function App() {
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [cps, setCps] = useState(0);

    const projects = [
        { image: "/images/ground_antenna.webp", title: "Antena DIY 137MHz", name: "Condrea Flavius & " + "Bucataru Sebastian", description: "A DIY antenna and SDR setup designed to intercept the Russian Meteor-M N2-4 weather satellite and capture real-time, high-resolution digital imagery of the Earth.", footer: "https://github.com/Fla20035/Antena-DIY-137MHz"},
        { image: "/images/game_2d.jpg", title: "2D Platformer Unity", name: "Condrea Flavius-Valentin", description: "A punishing 2D micro-platformer. Created in Munich, Germany, as part of an Erasmus study abroad program", footer: "https://github.com/Fla20035/PixelQuest-The-Lost-Kingdom"},
        { image: "/images/op_amp.jpeg", title: "Band Pass Filter", name: "Condrea Flavius-Valentin", description: "A band-pass filter prototype built using operational amplifiers, designed to allow frequencies between 1kHz and 10kHz to pass while attenuating frequencies outside this range.", footer: "https://github.com/Fla20035/PixelQuest-The-Lost-Kingdom"}
    ];

    const handleClick = () => {   
        const timpulCurent = Date.now();

        if (count === 0) {
            setStartTime(timpulCurent);
            setCps(0);
        } else {
            const secundeScurse = (timpulCurent - startTime) / 1000; // convert din milisecunde in secunde; 1 s = 1000 ms
            setCps((count + 1) / secundeScurse);
        }
        
        setCount(count + 1);
    };

    const handleReset = () => {
        setCount(0);
        setStartTime(null);
        setCps(0);
    };


    return (
      <div className="app-container">

        <hr className="divider" /> 
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
        <hr className="divider" /> 


        <h1 className="page-title">Condrea Flavius-Valentin</h1>
        
        <div className="counter-section">
                <p className="counter-text">Ai apăsat de <strong>{count}</strong> ori</p>
                    <p className="cps-text">CPS: {cps.toFixed(2)}</p>

                    <div className="button-group">
                        <button className="primary-btn" onClick={handleClick}>
                            Click rapid!
                        </button>

                        {count > 0 && (
                            <button className="reset-btn" onClick={handleReset}>
                                Reset
                            </button>
                                )}
                    </div>
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

        <hr className="divider" />
            <div className='notes-container'>
                <QuickNote />
                <ToDoList />
            </div>

        <hr className="divider" />

        <div className='container-project-weather'>
            <ProjectsList/>
            <WeatherWidget />
        </div>

        <hr className="divider" />

        <ContactForm />

        <hr className="divider" />

      </div>
    );
}

export default App;