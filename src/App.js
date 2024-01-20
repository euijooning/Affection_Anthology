import React from "react";
import { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Log from "./pages/Log";

export const LogStateContext = React.createContext();
export const LogDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "테스트 내용 1",
    date: 1705752944616, //   console.log(new Date().getTime()); 찍어보면 나오는 값
  },
  {
    id: 2,
    emotion: 3,
    content: "테스트 내용 2",
    date: 1705752944618, //   console.log(new Date().getTime()); 찍어보면 나오는 값
  },
  {
    id: 3,
    emotion: 5,
    content: "테스트 내용 3",
    date: 1705752944619, //   console.log(new Date().getTime()); 찍어보면 나오는 값
  },
  {
    id: 4,
    emotion: 2,
    content: "테스트 내용 4",
    date: 1705752944620, //   console.log(new Date().getTime()); 찍어보면 나오는 값
  },
  {
    id: 5,
    emotion: 1,
    content: "테스트 내용 5",
    date: 1705752944621, //   console.log(new Date().getTime()); 찍어보면 나오는 값
  },
];

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
    return newState;
  };

  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

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
        id: dataId.current,
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
              <Route path="/edit" element={<Edit />} />
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
