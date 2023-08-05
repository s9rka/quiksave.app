import { useRef, useState, useEffect } from "react";
import trashicon from "../assets/trashicon.svg";
import trashiconred from "../assets/trashiconred.svg";
import addicon from "../assets/addicon.svg";
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Input() {
  const [stored, setStored] = useState([]);
  const noteRef = useRef();
  const categoryRef = useRef();
  const submitCategoryRef = useRef();
  const sourceRef = useRef();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const refOne = useRef(null);
  const url =
    "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app";
  const catUrl =
    "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  const toggleGenerator = () => {
    setShowGenerator((current) => !current);
  };

  const toggleDelete = () => {
    setShowDelete((current) => !current);
  };

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}.${month}.${year}`;

  function onAddMemory() {
    const newMemory = {
      note: noteRef.current.value,
      category: checked,
      source: sourceRef.current.value,
      date: currentDate,
    };

    if (noteRef.current.value === "") {
      alert("Empty field cannot be submitted");
    } else if (checked.length < 1) {
      alert("Tag must be applied");
    } else {
      fetch(url + "/memories.json", {
        method: "POST",
        body: JSON.stringify(newMemory),
        headers: { "Content-Type": "application/json" },
      });
      stored.push(newMemory);
      setStored(stored.slice());
      toast.info("Successfully stored!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    document.getElementById("input_field").value = "";
    document.getElementById("input_field2").value = "";
  }

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, JSON.parse(event.target.value)];
    } else {
      updatedList.splice(checked.indexOf(JSON.parse(event.target.value)), 1);
    }
    setChecked(updatedList);
    console.log(updatedList);
  };

  useEffect(() => {
    fetch(catUrl)
      .then((response) => response.json())
      .then((responseBody) => {
        const categoriesFromDb = [];
        for (const key in responseBody) {
          categoriesFromDb.push(responseBody[key]);
        }
        setCategories(categoriesFromDb);
      });
  }, []);

  function addCategory() {
    const newCategory = {
      name: categoryRef.current.value,
    };
    fetch(catUrl, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
      },
    });
    categories.push(newCategory);
    setCategories(categories.slice());
    categoryRef.current.value = "";
    setShowGenerator((current) => !current);
  }

  function deleteCategory(category) {
    const index = categories.findIndex(
      (element) => element.name === category.name
    );
    categories.splice(index, 1);
    setCategories(categories.slice());

    fetch(catUrl, {
      method: "PUT",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="input">
      <div className="input-container">
        <img className="decoration" src={logo} />
        <textarea
          id="input_field"
          className="input-field textarea"
          placeholder="Write here"
          autoFocus
          ref={noteRef}
          type="text"
          role="textbox"
          contenteditable
        ></textarea>

        <input
          className="input-field small"
          placeholder="Source (optional)"
          ref={sourceRef}
          id="input_field2"
        ></input>
        <div className="category-tag-container">
          <div className="category-heading">
            Memory tag
            <div className="wrapper">
              <div
                onClick={toggleGenerator}
                className={showGenerator ? "manage-tags-active" : "manage-tags"}
              >
                <img src={addicon} alt="add-icon"></img>
              </div>
              <div
                onClick={toggleDelete}
                className={showDelete ? "manage-tags-active" : "manage-tags"}
              >
                <img
                  className="manage-icon"
                  src={trashicon}
                  alt="trash-icon"
                ></img>
              </div>
            </div>
          </div>

          <div className="category-tags">
            {categories.map((element) => (
              <div className="inner">
                <input
                  required
                  ref={submitCategoryRef}
                  value={JSON.stringify(element.name)}
                  id={element.name}
                  name="category"
                  type="checkbox"
                  onChange={handleCheck}
                />
                <label class="button-checkbox" for={element.name}>
                  <svg viewBox="0 0 84.5 84.5">
                    <path
                      class="box"
                      d="M11,3H81.5a0,0,0,0,1,0,0V73.5a8,8,0,0,1-8,8H3a0,0,0,0,1,0,0V11a8,8,0,0,1,8-8Z"
                    />
                    <path
                      class="check"
                      d="M22.2,22.2H58.3a4,4,0,0,1,4,4V62.3a0,0,0,0,1,0,0H26.2a4,4,0,0,1-4-4V22.2A0,0,0,0,1,22.2,22.2Z"
                    />
                  </svg>
                  <span>{element.name}</span>
                </label>

                {showDelete && (
                  <div className="delete-tag-container">
                    <button
                      className="button-delete-tag"
                      onClick={() => deleteCategory(element)}
                    >
                      
                        <img src={trashiconred}/>
                      
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="new-tag">
              {showGenerator && (
                <div className="tag-generator cf">
                  <div ref={refOne} className="generator-container">
                    <input
                      autoFocus
                      className="tag-input"
                      placeholder="Tag name"
                      ref={categoryRef}
                      type="text"
                    />
                    <div
                      className="button-add-tag"
                      onClick={() => addCategory()}
                    >
                      <img src={addicon} alt="add-icon"></img>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="submit-button" onClick={() => onAddMemory()}>
            Save
          </div>
          <ToastContainer
            id="toast-container"
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
      <div className="button-container notes">
        <Link to="/storage" className="submit-button my-notes">
          My notes
        </Link>
      </div>
    </div>
  );
}
