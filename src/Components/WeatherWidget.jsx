import { useState, useEffect } from "react";
import "../Styles/WeatherWidget.css";

function WeatherWidget() {
    // State-uri pentru vreme
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // NOU: State-uri pentru căutare și numele orașului afișat
    const [searchInput, setSearchInput] = useState("");
    const [locationName, setLocationName] = useState("Brașov");

    // Funcția principală care aduce datele (Geocoding + Vreme)
    const fetchWeather = (city) => {
        setLoading(true);
        setError(null);

        // Pasul 1: Căutăm coordonatele orașului
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ro&format=json`)
            .then((res) => {
                if (!res.ok) throw new Error("Eroare de rețea la căutare.");
                return res.json();
            })
            .then((geoData) => {
                // Dacă nu am primit rezultate (orașul nu există sau e scris greșit)
                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("Orașul nu a fost găsit!");
                }

                // Extragem datele din primul rezultat
                const { latitude, longitude, name } = geoData.results[0];
                setLocationName(name); // Actualizăm numele frumos (ex: "București" în loc de "bucuresti")

                // Pasul 2: Cerem vremea folosind coordonatele găsite
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            })
            .then((res) => {
                if (!res.ok) throw new Error("Eroare la aducerea vremii.");
                return res.json();
            })
            .then((weatherData) => {
                // Succes final! Salvăm vremea
                setWeather(weatherData.current_weather);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    // useEffect rulează o singură dată la început
    useEffect(() => {
        fetchWeather("Brașov"); // Încărcăm locația implicită
    }, []);

    // Funcția care rulează când apeși butonul "Caută" sau dai Enter
    const handleSearch = (e) => {
        e.preventDefault(); // Oprim refresh-ul paginii
        if (searchInput.trim() !== "") {
            fetchWeather(searchInput);
            setSearchInput(""); // Curățăm bara de căutare după ce trimitem
        }
    };

    return (
        <div className="weather-section">
            <h3 className="weather-title">Vremea curentă</h3>

            {/* Formularul de căutare */}
            <form onSubmit={handleSearch} className="weather-search-form">
                <input 
                    type="text" 
                    className="weather-search-input"
                    placeholder="Caută alt oraș..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="weather-search-btn">🔍</button>
            </form>

            {/* Rămânem la fel cu afișarea stărilor */}
            {loading && (
                <div className="weather-status-box">
                    <p>Se citește termometrul...</p>
                </div>
            )}

            {error && (
                <div className="weather-status-box error-state">
                    <p>❌ {error}</p>
                </div>
            )}

            {/* Afișăm vremea doar dacă nu se încarcă și nu avem erori */}
            {!loading && !error && weather && (
                <>
                    <p className="weather-location">{locationName}</p>
                    <div className="weather-temp-container">
                        <div className="weather-temp">{Math.round(weather.temperature)}</div>
                        <div className="weather-unit">°C</div>
                    </div>
                    <div className="weather-details">
                        <p>Vânt: <strong>{weather.wind_speed} km/h</strong></p>
                        <p>Direcție: <strong>{weather.wind_direction}°</strong></p>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherWidget;
