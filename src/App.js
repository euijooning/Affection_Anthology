import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Log from "./pages/Log";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>App.js file</h1>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/edit" element={<Edit />}/>
          <Route path="/log" element={<Log />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
