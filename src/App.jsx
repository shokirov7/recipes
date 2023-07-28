import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Nav2 from "./components/nav2/Nav2";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Recipe from "./pages/recipe/Recipe";
import { Context } from "./context/ThemeContext";

function App() {

  const [color, setColor] = useState(false)
  const {mode} = useContext(Context)
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={mode ? "App night" : "App"}>
      <BrowserRouter>
        <Navbar>
        </Navbar>
        <Nav2 />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/recipe/:id" element={<Recipe/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
