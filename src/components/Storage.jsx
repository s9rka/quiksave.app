import React, { useEffect } from 'react'
import { useState } from 'react';


function Storage() {

    const [stored, setStored ] = useState([]);
    const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"

    useEffect(() => {  
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const notesFromDb = [];
      for (const key in responseBody) {
          notesFromDb.push(responseBody[key]);
        }
      setStored(notesFromDb);
    })
  },[]);

  function deleteNote(note) {
    const index = stored.findIndex(element => element.id === stored.id);
    stored.splice(index,1);
    setStored(stored.slice());

    fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(stored),
        "headers": {
            "Content-Type": "application/json"
        }
    })
  }

  return (
    <div>
        Storage
        <div>
            { stored.map(element =>
                <div>
                    {element.note}
                    <button onClick={() => deleteNote(element)}>delete</button>
                </div>)}
        </div>
    </div>
  )
}

export default Storage;