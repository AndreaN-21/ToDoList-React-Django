import { useEffect, useState } from "react";
import api from "../api";
import { useTodos, useCounter } from "../store";
import { shallow } from "zustand/shallow";

function Home ({logout}) {
  
  const todos = useTodos((state) => state.todos, shallow)
  const setTodos = useTodos((state) => state.setTodos)
  const addTodo = useTodos((state) => state.addTodo)
  const deleteTodo = useTodos((state) => state.deleteTodo)


  const counter = useCounter((state) => state.counter);
  const incrCounter = useCounter((state) => state.incrCounter);

  
  const state = useCounter();
  console.log(state.counter)  
// 0
state.incrCounter();


  const getTodos = async () => {
    console.log(counter)
    const response = await api.get('api/todos/')   
    .then(res => {
      setTodos(res.data)
      incrCounter()
      
    })
    .catch(error => {
      console.log(error.response)
    }) 
    console.log(counter)
  }

  const delTodo = async (id) => {
    const response = await api.delete(`api/todos/${id}/`)   
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

  useEffect(() => {
    getTodos();
  }, []);


  return (
    <div>
      <h1>Home</h1>
      <button onClick={()=> logout}>Logout</button>
    </div>
  );
}

export default Home;