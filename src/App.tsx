import { useState, useReducer } from "react";

import "./App.css";
import Tasks from './Tasks';

export const ACTIONS = {
  ADD_TASK: 'add_task',
  ERROR_ENTRY: 'error_entry',
  TOGGLE_TASK: 'toggle_task',
}


//reducer function
function reducer (state, action) {
  switch(action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, newTask(action.payload.name)]
      }
     case ACTIONS.ERROR_ENTRY:
       return {
         ...state,
         error: action.payload
       }
     case ACTIONS.TOGGLE_TASK:
        return {
          ...state,
          tasks: state.tasks.map((task) => {
         if (task.id === action.payload.id) {
           return {
         ...task, complete: !task.complete
       }
       }
       return task  
       })
        }
       /*return state.tasks.map((task) => {
         if (task.id === action.payload.id) {
           return {
         ...task, complete: !task.complete
       }
       }
       return task  
       })*/
       
  }
}

//newtask function 
function newTask(name) {
  return {
    id: Date.now(),
    name: name,
    completed: false
  }
}

function App() {
    const [name, setName] = useState('');
  
  const [state, dispatch] = useReducer(reducer, {tasks: [], error: ''})
   const {error, tasks} = state;
   
   //handleSubmit function
  function handleSubmit(e) {
     e.preventDefault();
     if (name.length >= 3){
       dispatch({type: ACTIONS.ADD_TASK, payload: {name: name}})
     } else {
      dispatch({type: ACTIONS.ERROR_ENTRY, payload: 'input must be more than 3 characters'}) 
     }
     
     setName('')
  }
  
  //handleChange function
  
  function handleChange(e) {
    let input = e.target.value
    setName(input);
    if (input.length < 3 ) {
      dispatch({type: ACTIONS.ERROR_ENTRY, payload: 'input must be more than 3 characters'})
    } else {
      dispatch({type: ACTIONS.ERROR_ENTRY, payload: null})
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
      {tasks.map((task)=> (
        <Tasks key={task.id} tasks={task} dispatch={dispatch}/>
      ))}
      
      
      </div>
      
    </div>
  );
}

export default App;
