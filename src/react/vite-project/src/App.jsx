import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const clickHandler = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    setTimeout(() => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    }, 0);

    console.log(count);
  };

  useEffect(() => {
    document.getElementById("btn").addEventListener("click", () => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);

      console.log(count);
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button id="btn">count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
