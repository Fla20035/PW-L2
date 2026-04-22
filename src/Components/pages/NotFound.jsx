import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="page-container">
      <h1>404</h1>
      <p>Pagina nu exista</p>
      <Link to="/">Home</Link>
    </div>
  );
}
