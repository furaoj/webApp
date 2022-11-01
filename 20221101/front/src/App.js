import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage";
import InfoPage from "./component/InfoPage";

export const Global = createContext();

function App() {
  const today = new Date();
  return (
    <Global.Provider value={today}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Info" element={<InfoPage />} />
        </Routes>
      </BrowserRouter>
    </Global.Provider>
  );
}

export default App;
