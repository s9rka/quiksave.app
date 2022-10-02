import React, { useEffect } from 'react'
import { useState } from 'react';
import '../css/Storage.scss';

function Storage() {
    const [stored, setStored ] = useState([]);
    const [oriStored, setOriStored] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"
    const catUrl ="https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json"

    useEffect(() => {  
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const notesFromDb = [];
      for (const key in responseBody) {
          notesFromDb.push(responseBody[key]);
        }
      setStored(notesFromDb);
      setOriStored(notesFromDb);
    })
  },[]);

  useEffect(() => {  
    fetch(catUrl).then(response => response.json())
    .then(responseBody => {
      const catsFromDb = [];
      for (const key in responseBody) {
          catsFromDb.push(responseBody[key]);
        }
      setCategories(catsFromDb);
    })
  },[]);

  const toggleDelete = () => {
    setShowDelete(current => !current);
}

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

  const onSelectCategory = (category) => {
    if (category === 'all') {
        setStored(oriStored);
        setSelectedCategory('all');
    } else {
        setStored(oriStored.filter(element => element.category.indexOf(category) >= 0));
        setSelectedCategory(category);
        console.log(category)
    }
    }

    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
    <div className="storage-container">
        <h1 className='heading-one'>Storage</h1>
        <div className="category-filter-container">
            <div className={"category-filter" + (selectedCategory === 'all' && "_active")} onClick={() => onSelectCategory('all')}>All</div>
            { categories.map(element =>
            <div onClick={() => onSelectCategory(element.name)} className={"category-filter" + (selectedCategory === element.name && "_active")}>{element.name}</div>) }
        </div>
        <div className='storage'>
            { stored.map(element => 
                <div className='post'>
                    <div className="post-head">
                        <div className="post-category-container">
                            <div className="post-category">{element.category[0]}</div>
                            { element.category.length > 1 && <div className='post-category'>{element.category[1]}</div> }
                            { element.category.length > 2 && <div className='post-category'>{element.category[2]}</div> }
                        </div>

                        <div className="more">
                            <div className='more-button' onClick={() => deleteNote(element)}>
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 36C20.5304 36 21.0391 35.7893 21.4142 35.4142C21.7893 35.0391 22 34.5304 22 34V22C22 21.4696 21.7893 20.9609 21.4142 20.5858C21.0391 20.2107 20.5304 20 20 20C19.4696 20 18.9609 20.2107 18.5858 20.5858C18.2107 20.9609 18 21.4696 18 22V34C18 34.5304 18.2107 35.0391 18.5858 35.4142C18.9609 35.7893 19.4696 36 20 36ZM40 12H32V10C32 8.4087 31.3679 6.88258 30.2426 5.75736C29.1174 4.63214 27.5913 4 26 4H22C20.4087 4 18.8826 4.63214 17.7574 5.75736C16.6321 6.88258 16 8.4087 16 10V12H8C7.46957 12 6.96086 12.2107 6.58579 12.5858C6.21071 12.9609 6 13.4696 6 14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16H10V38C10 39.5913 10.6321 41.1174 11.7574 42.2426C12.8826 43.3679 14.4087 44 16 44H32C33.5913 44 35.1174 43.3679 36.2426 42.2426C37.3679 41.1174 38 39.5913 38 38V16H40C40.5304 16 41.0391 15.7893 41.4142 15.4142C41.7893 15.0391 42 14.5304 42 14C42 13.4696 41.7893 12.9609 41.4142 12.5858C41.0391 12.2107 40.5304 12 40 12ZM20 10C20 9.46957 20.2107 8.96086 20.5858 8.58579C20.9609 8.21071 21.4696 8 22 8H26C26.5304 8 27.0391 8.21071 27.4142 8.58579C27.7893 8.96086 28 9.46957 28 10V12H20V10ZM34 38C34 38.5304 33.7893 39.0391 33.4142 39.4142C33.0391 39.7893 32.5304 40 32 40H16C15.4696 40 14.9609 39.7893 14.5858 39.4142C14.2107 39.0391 14 38.5304 14 38V16H34V38ZM28 36C28.5304 36 29.0391 35.7893 29.4142 35.4142C29.7893 35.0391 30 34.5304 30 34V22C30 21.4696 29.7893 20.9609 29.4142 20.5858C29.0391 20.2107 28.5304 20 28 20C27.4696 20 26.9609 20.2107 26.5858 20.5858C26.2107 20.9609 26 21.4696 26 22V34C26 34.5304 26.2107 35.0391 26.5858 35.4142C26.9609 35.7893 27.4696 36 28 36Z" fill="black"/>
                                </svg>
                            </div>
                            <div className='more-button'>
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 35.9999H18.48C18.7432 36.0014 19.0041 35.951 19.2478 35.8514C19.4915 35.7519 19.7131 35.6052 19.9 35.4199L33.74 21.5599L39.42 15.9999C39.6075 15.814 39.7562 15.5927 39.8578 15.349C39.9593 15.1053 40.0116 14.8439 40.0116 14.5799C40.0116 14.3159 39.9593 14.0544 39.8578 13.8107C39.7562 13.567 39.6075 13.3458 39.42 13.1599L30.94 4.57988C30.7541 4.39242 30.5329 4.24363 30.2892 4.1421C30.0454 4.04056 29.784 3.98828 29.52 3.98828C29.256 3.98828 28.9946 4.04056 28.7508 4.1421C28.5071 4.24363 28.2859 4.39242 28.1 4.57988L22.46 10.2399L8.58 24.0999C8.39464 24.2868 8.24799 24.5084 8.14846 24.7521C8.04893 24.9957 7.99848 25.2567 8 25.5199V33.9999C8 34.5303 8.21071 35.039 8.58579 35.4141C8.96086 35.7892 9.46957 35.9999 10 35.9999ZM29.52 8.81988L35.18 14.4799L32.34 17.3199L26.68 11.6599L29.52 8.81988ZM12 26.3399L23.86 14.4799L29.52 20.1399L17.66 31.9999H12V26.3399ZM42 39.9999H6C5.46957 39.9999 4.96086 40.2106 4.58579 40.5857C4.21071 40.9607 4 41.4694 4 41.9999C4 42.5303 4.21071 43.039 4.58579 43.4141C4.96086 43.7892 5.46957 43.9999 6 43.9999H42C42.5304 43.9999 43.0391 43.7892 43.4142 43.4141C43.7893 43.039 44 42.5303 44 41.9999C44 41.4694 43.7893 40.9607 43.4142 40.5857C43.0391 40.2106 42.5304 39.9999 42 39.9999Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="note">{element.note}</div>
                </div>)}
        </div>
    </div>
  )
}

export default Storage;