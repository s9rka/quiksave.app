import React from "react";
import trashiconred from "../assets/trashiconred.svg";
import { useState } from "react";
import { useEffect } from "react";

const DeleteModal = (props) => {
  const dbUrl =
    "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json";
  const [stored, setStored] = useState([]);
  const [oriStored, setOriStored] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  const [deleteActive, setDeleteActive] = useState(false);

  const [startTime, setStartTime] = useState([props]);
  
  useEffect(() => {
    if (props !== stored) {
      setStartTime(stored);
    }
  }, [props]);

  function activateDelete() {
    setDeleteActive(true);
  }

  function deactivateDelete() {
    setDeleteActive(false);
  }

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

  

  function deleteNote(storedNote) {
    const index = stored.findIndex(
      (element) => element.note === storedNote.note
    );
    stored.splice(index, 1);
    setStored(stored.slice());
    

    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(stored),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="modal-container">
      <div className="modal">
        {!deleteActive && (
          <div onClick={activateDelete} className="post-delete">
            <img src={trashiconred} />
          </div>
        )}
        {deleteActive && (
          <div className="modal-window" onClick={deactivateDelete}>
            <div className="modal-content">Are you sure?
            <span onClick={() => deleteNote(props)}>YES</span>
            <span>NO</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
