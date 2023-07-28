import React, { createContext, useReducer } from "react";

const Context = createContext();

function ThemeContext({ children }) {
  const themeChange = (state, action) => {
    switch (action.type) {
      case "CHANGE_COLOR":
        return { ...state, color: action.payload };
      case "CHANGE_MODE":
        return { ...state, mode: action.payload };
        case "CHANGE_OPENED":
        return { ...state, opened: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(themeChange, {
    color: "#1b1b1b",
    mode: false,
    opened: false,
  });

  const changeColor = (newColor) => {
    dispatch({
      type: "CHANGE_COLOR",
      payload: newColor,
    });
  };
  const changeMode = (newMode) => {
    dispatch({
      type: "CHANGE_MODE",
      payload: newMode,
    });
  };
  const isOpened = (newMode) => {
    dispatch({
      type: "CHANGE_OPENED",
      payload: newMode,
    });
  };

  return (
    <Context.Provider value={{ ...state, changeColor, changeMode, isOpened }}>
      {children}
    </Context.Provider>
  );
}

export { ThemeContext, Context };
