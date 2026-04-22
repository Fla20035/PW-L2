import { useState } from 'react';
import '../Styles/CPS.css';

function CPS() {
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [cps, setCps] = useState(0);

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
    );
}

export default CPS;
