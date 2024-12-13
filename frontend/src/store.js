import {create} from 'zustand' 
import api from './api'


export const useTodos = create((set) => ({
    todos: [],
    errorTodos: null,
    pendingTodos: false,
    setTodos: (todos) => set({ todos }),
    loadTodos: async () => {
      set(() => ({ pendingTodos: true }))
      await api.get('api/todos/')
      .then(res => {
        set(() => ({ 
          todos: res.data,
          errorTodos: null,
          pendingTodos: false 
        })) 
      })
      .catch(error => {
        set(() => ({ errorTodos: error.response }))
      })
    },
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
    editStatusTodo: (id, newStatus) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: newStatus } : todo )
          })),
    
}))


export const useCounter = create((set) => {
    return {
      counter: 0,
      incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
    };
  });