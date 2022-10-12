import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

function App() {
  const [output, setOutput] = useState("");

  const handleOutputReact = (event) => {
    setOutput(event.target.value);
  };

  const handleOutput = () => {
    const textbox = document.getElementById("stock_id");
    const value = textbox.value;
    const sampleArea = document.getElementById("outputArea");
    sampleArea.innerHTML = value;
  };

  return (
    <div className="App">
      <p>React & Python 勉強</p>
      <input type="text" id="stock_id" onChange={handleOutputReact}></input>
      <p id="outputArea">{output}</p>
    </div>
  );
}

export default App;
