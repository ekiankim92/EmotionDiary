import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import { createContext, useReducer, useRef } from "react";

const reducer = (action, state) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((el) => el.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((el) =>
        el.id === action.targetId ? { ...action.data } : el
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "first diary",
    date: 1666332929657,
  },
  {
    id: 2,
    emotion: 2,
    content: "second diary",
    date: 1666332929658,
  },
  {
    id: 3,
    emotion: 3,
    content: "third diary",
    date: 1666332929659,
  },
  {
    id: 4,
    emotion: 4,
    content: "fourth diary",
    date: 1666332929660,
  },
  {
    id: 5,
    emotion: 5,
    content: "fifth diary",
    date: 1666332929661,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dateId = useRef(0);

  // prettier-ignore
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dateId.current,
      date: new Date(date).getTime(),
      content,
      emotion
    }})
    dateId.current += 1
  }

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // prettier-ignore
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({type: "EDIT", data: {
      id: targetId,
      date: new Date(date).getTime(),
      content, 
      emotion
    }})
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
