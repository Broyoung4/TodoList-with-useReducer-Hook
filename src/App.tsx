import { useState, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [name, setName] = useState('');

  return (
    <>
      <form>
        <input value={name} onChange={(e)=> setName(e.target.value) />
        <button onSubmit={}>ADD</button>
      </form>
    </>
  );
}

export default App;
