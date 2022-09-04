import React, { useEffect } from 'react'
import { useState } from 'react';
import '../css/Storage.scss';


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

  function deleteNote(storedNote) {
    const index = stored.findIndex(element => element.note === storedNote.note);
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
        <h1 className='heading-one'>Storage</h1>
        <div className='storage'>
            { stored.map(element => 
                <div className='post'>
                    <div className="post-head">
                        <div className="post-category-container">
                            <div className="category">{element.category[0]}</div>
                            { element.category.length > 1 && <div className='category'>{element.category[1]}</div> }
                            { element.category.length > 2 && <div className='category'>{element.category[2]}</div> }
                        </div>

                        <div className="date">12.12.22</div>

                    </div>
                    <div className="note">{element.note}</div>
                    
                    <button className='delete-button' onClick={() => deleteNote(element)}>delete</button>
                </div>)}
        </div>
    </div>
  )
}

export default Storage;