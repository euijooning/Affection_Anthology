import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Log from "./pages/Log";

function App() {

  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
      <div className="App">
        <h1>App.js file</h1>
        <p>메인 페이지입니다.</p>

        {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} alt="img" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} alt="img" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} alt="img" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} alt="img" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} alt="img" /> */}

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
