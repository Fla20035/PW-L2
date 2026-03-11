import Card from './Card';

function App() {

    const projects = [
        { image: "/images/dumb_cat.png", title: "Proiect 1", name: "Condrea Flavius-Valentin", description: "Student UNITBV" },
        { title: "Proiect 2", name: "Condrea Flavius-Valentin", description: "Student UNITBV" },
        { title: "Proiect 3", name: "Condrea Flavius-Valentin", description: "Student UNITBV" },
    ];

    return (
      <div>
        <h1>Dashboard</h1>        
        {projects.map((project, index) => (
            <Card 
                key={index} // 
                image={project.image} 
                title={project.title}
                name={project.name}
                description={project.description}
            />
        ))}

      </div>
    );
}

export default App;