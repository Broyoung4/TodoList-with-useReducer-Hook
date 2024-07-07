import { useState, useReducer } from "react";

import "./App.css";
import Tasks from './Tasks';

export const ACTIONS = {
  ADD_TASK: 'add_task',
  ERROR_ENTRY: 'error_entry',
  TOGGLE_TASK: 'toggle_task',
  DELETE_TASK: 'delete_task'
}

//ALL TYPES
//Task type
type Task = {
  id: number;
  name: string;
  completed: boolean;
};

//State type
type State = {
  tasks: Task[];
  error: string | null;
};

// Define the Action type
type Action =
  | { type: 'add_task'; payload: { name: string } }
  | { type: 'error_entry'; payload: string | null }
  | { type: 'toggle_task'; payload: { id: number } }
  | { type: 'delete_task'; payload: { id: number } };

//reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, newTask(action.payload.name)],
      };
    case ACTIONS.ERROR_ENTRY:
      return {
        ...state,
        error: action.payload,
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id) 
      }
  }
}

//newtask function 
function newTask(name: string): Task {
  return {
    id: Date.now(),
    name: name,
    completed: false,
  };
}

function App() {
  //declares useState
  const [name, setName] = useState('');
  //declares useReducer
  const [state, dispatch] = useReducer(reducer, { tasks: [], error: null }); 
  //easier to read
  const { error, tasks } = state;

  //handleSubmit function
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.length >= 3) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: { name: name } });
    } else {
      dispatch({ type: ACTIONS.ERROR_ENTRY, payload: 'input must be more than 3 characters' });
    }
    setName('');
  }

  //handleChange function

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;
    setName(input);
    if (input.length < 3) {
      dispatch({ type: ACTIONS.ERROR_ENTRY, payload: 'input must be more than 3 characters' });
    } else {
      dispatch({ type: ACTIONS.ERROR_ENTRY, payload: null });
    }
  }

  console.log(tasks);

  return (
    <div className='container'>
      <div className='card'>
        <h1>Todo or Not</h1>
        <form className='app_form' onSubmit={handleSubmit}>
          <input type='text' value={name} placeholder='Enter a Task' onChange={handleChange} />
          <button type='submit'>ADD</button>
        </form>
        <span className='error_message'>{error}</span>
        {tasks.map((task) => (
          <Tasks key={task.id} tasks={task} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

export default App;