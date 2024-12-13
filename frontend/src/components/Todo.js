import React from "react";
import "../styles/todo.css";  
import { useState } from "react";

const Todo = React.memo(({ todo, onDelete, onToggle }) => {
    const formattedDate = new Date(todo.created_at).toLocaleDateString("en-US")
    const [isChecked, setIsChecked] = useState(todo.completed || false);

    const handleCheckboxChange = (event) => {

        setIsChecked(event.target.checked);

    };
  
    return (
        <div className="note-container"> 
            <div style={{flexDirection:"row", display: "flex", alignItems:"center", gap:"10px", justifyContent:"space-between"}}>
                <p className={ todo.completed ? "todo-title-completed" : "todo-title"}>{todo.title}</p>  
                <div >
                    <p className="note-date">{formattedDate}</p> 
                    <button 
                        className="delete-button" 
                        onClick={() => onDelete(todo.id)}>  
                    </button>
                    <div className="checkbox-container">
                        <label>
                            <input 
                                type="checkbox"
                                name="isChecked"
                                checked={todo.completed}
                                onChange={() => onToggle(todo.id, !todo.completed)}
                            /> 
                        </label>
                    </div>
                </div>
                
               
            </div> 
            
        </div>
    );
});

export default Todo