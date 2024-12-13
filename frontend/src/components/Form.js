import React, { useState } from 'react';
import { useTodos } from '../store';
import api from '../api';

const Form = () => {


    const addTodo = useTodos((state) => state.addTodo)
    const [title, setTitle] = useState(""); 

    const createTodo= (e) => { 
        e.preventDefault();
        api
            .post("/api/todos/", { title })
            .then((res) => {
                if (res.status === 201) {
                  alert("Todo created!");
                  addTodo({
                    id:res.data.id, 
                    title, 
                    completed: false, 
                    user: res.data.user, 
                    created_at: res.data.created_at
                });
                }
                else alert("Failed to make todo."); 
            })
            .catch((err) => alert(err));
    };

    return(
        <form onSubmit={createTodo}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />  
            <input type="submit" value="Add"></input>
        </form>
    )
}


export default Form;
