import { NavLink } from 'react-router';
// Asigură-te că exporți corect stilurile, fie importând App.css aici, fie bazându-te pe importul din App.jsx

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/projects" className="nav-link">Proiecte</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>
    );
}

export default Navbar;