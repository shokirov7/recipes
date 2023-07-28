import React, { useContext, useEffect, useState } from "react";
import "./Create.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { Context } from "../../context/ThemeContext";
// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [ingred, setIngred] = useState("");
  const [method, setMethod] = useState("");
  const [cook, setCook] = useState("");
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  
  const pushText = () => {
    if (input.trim() !== "") {
      if (!list.includes(input)) {
        setList([...list, input]);
      }
    }
    setInput("");
  };

  const navigate = useNavigate();
  const { opened } = useContext(Context);
  const { isOpened } = useContext(Context);
  
  const toObject = async () => {
    setIsPending(true);
    const newObj = {
      id: Math.floor(Math.random() * 9999) + 1,
      title: title,
      ingredients: list,
      method: method,
      cookingTime: cook,
    };
    
    await projectFirestore.collection("recipes").add(newObj);
    setIsPending(false);
    isOpened(false);
    navigate("/");
    
  };
  
  return (
    <div className="create">
      {isPending ? (
        <Loader />
        ) : (
          <div className="form_holder">
          <form className="form">
            <div className="header">Create your recipe</div>
            <div className="inputs">
              <div className="input_block">
                <div className="input_label">Title</div>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  />
              </div>
              <form className="input_block input_block_ingred">
                <div className="ib_ingred_left">
                  <div className="input_label">Ingredients</div>
                  <input
                    className="input"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    />
                  <div className="in_ingred_right">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        pushText();
                      }}
                      to="/create"
                      >
                      ADD
                    </button>
                  </div>
                  <div className="ingredient_list">
                    <div className="ingred_title">Ingredients:</div>
                    <div className="ingred_text">{list.join(", ")}</div>
                  </div>
                </div>
              </form>
              <div className="input_block">
                <div className="input_label">Method</div>
                <textarea
                  onChange={(e) => setMethod(e.target.value)}
                  name=""
                  className="input input-area"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="input_block">
                <div className="input_label">Cooking time</div>
                <input
                  onChange={(e) => setCook(e.target.value)}
                  className="input"
                  type="text"
                  />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault(), toObject();
                }}
                className="sigin-btn"
                >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Create;
