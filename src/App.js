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
          <Route path="/log/:id" element={<Log />}/> {/*id가 없는 일기는 없으므로 일단 이렇게 모두 붙도록 작성*/}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
