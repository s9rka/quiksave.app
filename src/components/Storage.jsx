import React, { useEffect } from "react";
import { useState } from "react";
import trashicon from "../assets/trashicon.svg";
import trashiconred from "../assets/trashiconred.svg";
import bigadd from "../assets/big-add2.svg";
import SourceModal from "./SourceModal";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

function Storage() {
  const [stored, setStored] = useState([]);
  const [oriStored, setOriStored] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const dbUrl =
    "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json";
  const catUrl =
    "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  const toggleDelete = () => {
    setShowDelete((current) => !current);
  };

  useEffect(() => {
    fetch(dbUrl)
      .then((response) => response.json())
      .then((responseBody) => {
        const notesFromDb = [];
        for (const key in responseBody) {
          notesFromDb.push(responseBody[key]);
        }
        setStored(notesFromDb);
        setOriStored(notesFromDb);
      });
  }, []);

  useEffect(() => {
    fetch(catUrl)
      .then((response) => response.json())
      .then((responseBody) => {
        const catsFromDb = [];
        for (const key in responseBody) {
          catsFromDb.push(responseBody[key]);
        }
        setCategories(catsFromDb);
      });
  }, []);

  function deleteNote(storedNote) {
    const index = stored.findIndex(
      (element) => element.note === storedNote.note
    );
    stored.splice(index, 1);
    setStored(stored.slice());
    toggleDelete();

    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(stored),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const onSelectCategory = (category) => {
    if (category === "all") {
      setStored(oriStored);
      setSelectedCategory("all");
    } else {
      setStored(
        oriStored.filter((element) => element.category.indexOf(category) >= 0)
      );
      setSelectedCategory(category);
      console.log(category);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="storage-wrapper">
      <div className="storage-container">
        <div className="head">
          <h1 className="heading-one">My notes</h1>
          <div
            onClick={toggleDelete}
            className={
              showDelete
                ? "manage-tags-active storage-version"
                : "manage-tags storage-version"
            }
          >
            <img className="manage-icon" src={trashicon} alt="trash-icon"></img>
          </div>
        </div>
        <div className="category-filter-container">
          <div
            className={
              "category-filter" + (selectedCategory === "all" && "_active")
            }
            onClick={() => onSelectCategory("all")}
          >
            All
          </div>
          {categories.map((element) => (
            <div
              onClick={() => onSelectCategory(element.name)}
              className={
                "category-filter" +
                (selectedCategory === element.name && "_active")
              }
            >
              {element.name}
            </div>
          ))}
        </div>
        <div className="storage">
          {[...stored].reverse().map((element, index) => {
            return (
              <div key={index} className="post">
                <div className="post-head">
                  <div className="post-category-container">
                    <div className="post-category">{element.category[0]}</div>
                    {element.category.length > 1 && (
                      <div className="post-category">{element.category[1]}</div>
                    )}
                    {element.category.length > 2 && (
                      <div className="post-category">{element.category[2]}</div>
                    )}
                    {element.source && <SourceModal source={element.source} />}

                  </div>
                  
                  {!showDelete && <div className="date">{element.date}</div>}
                  {showDelete && <DeleteModal note={element.note} startTime={element}/>}
                </div>
                
                <div className="note">{element.note}</div>
                
              </div>
            );
          })}
        </div>
        <div className="manage">
          <Link to="/quiksave">
            <div onClick="" className="add-new">
              <img src={bigadd} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Storage;

/*
<div
                    className={showDelete ? "toolbar-active" : "toolbar"}
                    onClick={toggleDelete}
                  >
                    {showDelete && (
                      <div
                        className="delete-button"
                        onClick={() => deleteNote(element)}
                      >
                        <img src={trashiconred}/>
                      </div>
                    )}
                  </div>
                  */
