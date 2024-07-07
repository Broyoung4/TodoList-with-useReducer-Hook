import React from 'react';
import './App.css';
import { ACTIONS, Task } from './App.tsx'; // Import ACTIONS and Task from App.tsx

export default function Tasks({ tasks, dispatch }: { tasks: Task; dispatch: React.Dispatch<any> }) {
  return (
    <div className='app_tasks'>
      <input 
        type='checkbox' 
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id: tasks.id } })}  
      />
      <h3 className={`${tasks.completed === true ? 'text-cross' : ''}`} >{tasks.name}</h3>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_TASK, payload: { id: tasks.id } })}>DELETE</button>
    </div>
  )
}