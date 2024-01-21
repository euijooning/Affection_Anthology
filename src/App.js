import React, { useEffect } from "react";
import { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Log from "./pages/Log";

export const LogStateContext = React.createContext();
export const LogDispatchContext = React.createContext();

function App() {
  const reducer = (state, action) => {
    let newState = [];

    switch (action.type) {
      case "INIT": {
        return action.data;
      }
      case "CREATE": {
        const newItem = {
          ...action.data,
        };
        newState = [newItem, ...state];
        break;
      }
      case "REMOVE": {
        newState = state.filter((it) => it.id !== action.targetId);
        break;
      }
      case "EDIT": {
        newState = state.map((it) =>
          it.id === action.data.id ? { ...action.data } : it
        );
        break;
      }
      default:
        return state;
    }
    localStorage.setItem("log", JSON.stringify(newState));
    return newState;
  };

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("log");
    if (localData) {
      const logList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(logList[0].id) + 1;

      // console.log(logList);
      // console.log(dataId);
      dispatch({type:"INIT", data:logList})
    }
  }, []);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <LogStateContext.Provider value={data}>
      <LogDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/log/:id" element={<Log />} />
              {/*id가 없는 일기는 없으므로 일단 이렇게 모두 붙도록 작성*/}
            </Routes>
          </div>
        </BrowserRouter>
      </LogDispatchContext.Provider>
    </LogStateContext.Provider>
  );
}

export default App;
