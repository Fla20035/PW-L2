import { useState, useEffect } from 'react';

function Home() {
    const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });

    useEffect(() => {
        fetch('http://localhost:3000/api/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error('Eroare la încărcare statistici Home:', err));
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Bine ai venit!</h2>
            <p>Acesta este dashboard-ul meu centralizat.</p>

            {/* Secțiunea nouă de statistici live cerută de Exercițiul 4 */}
            <div style={{ 
                margin: '2rem auto', 
                padding: '1rem', 
                maxWidth: '300px', 
                backgroundColor: '#f8fafc', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
            }}>
                <h4>Statistici Proiecte (Live din DB)</h4>
                <p>Total: <strong>{stats.total}</strong></p>
                <p>Finalizate: <strong style={{ color: '#16a34a' }}>{stats.done}</strong></p>
                <p>În lucru: <strong style={{ color: '#ca8a04' }}>{stats.inProgress}</strong></p>
            </div>
        </div>
    );
}

export default Home;