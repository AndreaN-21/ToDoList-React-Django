import {create} from 'zustand' 



export const useTodos = create((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }))
}))


export const useCounter = create((set) => {
    return {
      counter: 0,
      incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
    };
  });