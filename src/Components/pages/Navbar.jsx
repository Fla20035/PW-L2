import { NavLink } from 'react-router';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/projects" className="nav-link">Proiecte</NavLink>
            <NavLink to="/laborator" className="nav-link">Laborator PW</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>
    );
}

export default Navbar;
