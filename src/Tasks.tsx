import React from 'react';
import './App.css';
import ACTIONS from './App.js'


export default function Tasks({tasks, dispatch}) {
  return (
    <div className='app_tasks'>
      <input type='checkbox' onClick={() => dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: tasks.id}})}  />
    <h3 className={`${tasks.id === true ? 'text-cross' : ''}`} >{tasks.name}</h3>
      <button>Delete</button>
       
    </div>
  )
}