import React from 'react';
import './App.css';

export default function Tasks({tasks}) {
  return (
    <div className='app_tasks'>
      <input type='checkbox'  />
    <h3 className='' >{tasks.name}</h3>
      <button>Delete</button>
       
    </div>
  )
}