import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage";
import InfoPage from "./component/InfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Info" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
