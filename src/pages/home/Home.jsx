import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
// Toast
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const deleteEl = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  const notify = () =>
    toast.success("Recipe successfully deleted!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      transition: Slide,
      draggable: true,
      progress: 1,
      theme: "colored",
    });

  useEffect(() => {
    setIsPending(true);
    projectFirestore.collection("recipes").onSnapshot((data) => {
      if (!data.empty) {
        var result = [];
        data.forEach((item) => {
          result.push({ ...item.data(), id: item.id });
        });
        setData(result.reverse());
        setIsPending(false);
      } else {
        setData([]);
        setIsPending(false);
      }
    });
  }, []);
  return (
    <>
      {!isPending ? (
        <div className="home">
          <div className="home_cards_holder">
            {data &&
              data.map((item, i) => {
                return (
                  <div className="card" key={i}>
                    <div className="card_title">{item.title}</div>
                    <div className="card_info_block">
                      <div className="card_subtitle">Ingredients:</div>
                      <div className="card_text">
                        {item.ingredients.slice(0, 2).join(", ")}...
                      </div>
                    </div>
                    <div className="card_info_block">
                      <div className="card_subtitle">Method:</div>
                      <div className="card_text">
                        {item.method.slice(0, 20)}...
                      </div>
                    </div>
                    <div className="card_footer">
                      <div className="card_time">Cooking time:</div>
                      <div className="card_info_block card_info_block_time">
                        <div className="card_title_time">
                          {item.cookingTime}
                        </div>
                      </div>
                      <div className="card_more">
                        <Link to={`/recipe/${item.id}`} className="more_btn">
                          <span>Read More</span>
                        </Link>
                        <div
                          className="card_button"
                          onClick={() => {
                            deleteEl(item.id);
                            notify()
                          }}
                        >
                          <button className="button">
                            <svg viewBox="0 0 448 512" className="svgIcon">
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <ToastContainer />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
