import React, { useEffect, useState } from "react";
import "./Recipe.css";
import { Link, useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

function Recipe() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true)
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((item) => {
        setData(item.data());
        setIsPending(false)
      });

  },[]);

  return (
    <>
    {isPending && <Loader/>}
      {data && <div className="recipe">
          <div className="back_btn">
            <Link to="/">Back</Link>
          </div>
          <div className="card">
            <div className="card_title">{data && data.title}</div>
            <div className="card_ingreds">
              <span>Ingredients:</span>
              {data && data.ingredients}
            </div>
            <div className="card_method">
              <span>Method:</span>
              {data && data.method}
            </div>
            <div className="card_time">
              <span>Cooking time:</span>
              {data && data.cookingTime}
            </div>
          </div>
        </div>}
    </>
  );
}

export default Recipe;
