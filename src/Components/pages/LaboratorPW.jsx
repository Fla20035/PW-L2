import CPS from '../CPS';
import QuickNote from '../QuickNote';
import ToDoList from '../ToDoList';
import WeatherWidget from '../WeatherWidget';
import '../../Styles/QuickNote.css';
import '../../Styles/ToDoList.css';
import '../../Styles/LaboratorPW.css';

function LaboratorPW() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Laborator PW</h1>
                <p className="page-subtitle">Colecția de unelte și instrumente interactive.</p>
            </div>

            <div className="laborator-layout">
                <CPS />
                <QuickNote />
                <ToDoList />
                <WeatherWidget />
            </div>
        </div>
    );
}

export default LaboratorPW;
