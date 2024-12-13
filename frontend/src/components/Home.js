import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "../api";
import { useTodos, useCounter } from "../store";
import { shallow } from "zustand/shallow";
import Todo from "./Todo"; 
import "../styles/home.css"
import  Form  from "./Form";

function Home ({logout}) { 

  const todos = useTodos((state) => state.todos, shallow)
  const deleteTodo = useTodos((state) => state.deleteTodo)
  const editStatusTodo = useTodos((state) => state.editStatusTodo)
  const loadTodos = useTodos((state) => state.loadTodos)
 
  

  const delTodo = async (id) => {
    await api.delete(`api/todos/${id}/`)   
    .then(res => {
      if(res.status === 204) {
        console.log("Todo deleted successfully")
        deleteTodo(id)
      }
      else console.log("Something went wrong")
    })
    .catch(error => {
      console.log(error.response)
    }) 
  }


  const handleCheckboxChangeTodo = async (id, newStatus) => {
    console.log({completed: newStatus})
    await api.patch(`api/todos/${id}/update/`, {completed: newStatus})
    .then(res => {
      if(res.status === 200) {
        console.log("Todo updated successfully")
        editStatusTodo(id, newStatus)  
      }
      else console.log("Something went wrong")
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  useEffect(() => {
    loadTodos()  
  }, []); 

  return (
    <div>
      <h2>Create a new Todo</h2>
        <Form/>
        <div>
            <h2>Todo List</h2>
            {todos?.map((todo) => (
                <Todo 
                todo={todo} 
                onDelete={delTodo} 
                key={todo.id} 
                onToggle={handleCheckboxChangeTodo}/>
            ))}
        </div>
        
    </div>
);
}
Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Home; 