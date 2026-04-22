import { useState } from "react";
import "../Styles/ToDoList.css";

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");


    // Explicație pentru handleAdd:
    /* 1.Iei o foaie de hârtie complet nouă și goală (asta înseamnă []).

        2.Pui foaia veche la xerox și copiezi exact aceleași rânduri pe foaia nouă (asta face ...todos).

        3.Iei pixul și scrii noul task la finalul foii noi (asta face , input).

        4.Îi dai lui React foaia cea nouă și o arunci pe cea veche (asta face setTodos). */


    function handleAdd() {
        if (input.trim() === "") return; // nu ne lasa cu text gol sau doar spatiu
        setTodos([...todos, input]);
        setInput("");   
    }

    function handleDelete(index) {
        const newTodos = [...todos];
        newTodos.splice(index, 1); // sterge din array de la pos index un element
        setTodos(newTodos);
    }

    return (
        <div className="todo-section">
            <h3 className="todo-title">To-Do List</h3>
            
            <div className="todo-input-group">
                <input 
                    className="todo-input"
                    type="text"
                    placeholder="Adaugă un nou task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)} // event listener, asculta schimbarea din input si actualizeaza starea inputului
                />
                <button onClick={handleAdd} className="todo-btn-add">Adaugă</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li 
                    key={index} 
                    className="todo-item">
                    {todo}
                        <button 
                        onClick={() => handleDelete(index)} 
                        className="todo-btn-delete">Șterge</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
