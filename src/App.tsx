gimport { useState, useReducer } from "react";

import "./App.css";

const ACTIONS = {
  ADD_TASK: 'add_task',
  
}


//reducer function
function reducer (state, action) {
  switch(action.type) {
    case ACTIONS.ADD_TASK:
      return {
        tasks: [...state.task, newTask(action.payload.name)]
      }
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
  
  const [state, dispatch] = useReducer(reducer, {tasks: []})

  function handleSubmit (e) {
     e.preventDefault();
     dispatch({type: ACTIONS.ADD_TASK, payload: {name: name}})
     setName('')
  }

console.log(text)
  return (
    <>
      <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e)=> setName(e.target.value)} />
        <button>ADD</button>
      </form>
      
      <span>{text}</span>
    </>
  );
}

export default App;
