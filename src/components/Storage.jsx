import React, { useEffect } from 'react'
import { useState } from 'react';
import '../css/Storage.scss';
import trashicon from '../assets/trashicon.svg';
import moreicon from '../assets/more.svg';
import moreactive from '../assets/more-active.svg';
import { Link } from 'react-router-dom';


function Storage() {
    const [stored, setStored ] = useState([]);
    const [oriStored, setOriStored] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"
    const catUrl ="https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json"

    const toggleEdit = () => {
        setShowEdit(current => !current);
    }

    const toggleDelete = () => {
        setShowDelete(current => !current);
    }

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
                        <div className={showDelete ? 'toolbar-active' : 'toolbar'} onClick={toggleDelete}>
                            { !showDelete && <img src={moreicon}></img>}
                            { showDelete && <img src={moreactive}></img>}

                            {showDelete &&
                            <div className="delete-button" onClick={() => deleteNote(element)}>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.33333 13C8.55435 13 8.76631 12.9122 8.92259 12.7559C9.07887 12.5996 9.16667 12.3876 9.16667 12.1666V7.16663C9.16667 6.94561 9.07887 6.73365 8.92259 6.57737C8.76631 6.42109 8.55435 6.33329 8.33333 6.33329C8.11232 6.33329 7.90036 6.42109 7.74408 6.57737C7.5878 6.73365 7.5 6.94561 7.5 7.16663V12.1666C7.5 12.3876 7.5878 12.5996 7.74408 12.7559C7.90036 12.9122 8.11232 13 8.33333 13ZM16.6667 2.99996H13.3333V2.16663C13.3333 1.50358 13.0699 0.8677 12.6011 0.398859C12.1323 -0.0699818 11.4964 -0.333374 10.8333 -0.333374H9.16667C8.50363 -0.333374 7.86774 -0.0699818 7.3989 0.398859C6.93006 0.8677 6.66667 1.50358 6.66667 2.16663V2.99996H3.33333C3.11232 2.99996 2.90036 3.08776 2.74408 3.24404C2.5878 3.40032 2.5 3.61228 2.5 3.83329C2.5 4.05431 2.5878 4.26627 2.74408 4.42255C2.90036 4.57883 3.11232 4.66663 3.33333 4.66663H4.16667V13.8333C4.16667 14.4963 4.43006 15.1322 4.8989 15.6011C5.36774 16.0699 6.00363 16.3333 6.66667 16.3333H13.3333C13.9964 16.3333 14.6323 16.0699 15.1011 15.6011C15.5699 15.1322 15.8333 14.4963 15.8333 13.8333V4.66663H16.6667C16.8877 4.66663 17.0996 4.57883 17.2559 4.42255C17.4122 4.26627 17.5 4.05431 17.5 3.83329C17.5 3.61228 17.4122 3.40032 17.2559 3.24404C17.0996 3.08776 16.8877 2.99996 16.6667 2.99996ZM8.33333 2.16663C8.33333 1.94561 8.42113 1.73365 8.57741 1.57737C8.73369 1.42109 8.94565 1.33329 9.16667 1.33329H10.8333C11.0543 1.33329 11.2663 1.42109 11.4226 1.57737C11.5789 1.73365 11.6667 1.94561 11.6667 2.16663V2.99996H8.33333V2.16663ZM14.1667 13.8333C14.1667 14.0543 14.0789 14.2663 13.9226 14.4225C13.7663 14.5788 13.5543 14.6666 13.3333 14.6666H6.66667C6.44565 14.6666 6.23369 14.5788 6.07741 14.4225C5.92113 14.2663 5.83333 14.0543 5.83333 13.8333V4.66663H14.1667V13.8333ZM11.6667 13C11.8877 13 12.0996 12.9122 12.2559 12.7559C12.4122 12.5996 12.5 12.3876 12.5 12.1666V7.16663C12.5 6.94561 12.4122 6.73365 12.2559 6.57737C12.0996 6.42109 11.8877 6.33329 11.6667 6.33329C11.4457 6.33329 11.2337 6.42109 11.0774 6.57737C10.9211 6.73365 10.8333 6.94561 10.8333 7.16663V12.1666C10.8333 12.3876 10.9211 12.5996 11.0774 12.7559C11.2337 12.9122 11.4457 13 11.6667 13Z" fill="#C20202"/>
                                </svg>
                            </div>}
                        </div>
                    </div>
                    <div className="note">
                        {element.note}
                    </div>
                </div>)}
                <div className="manage">
            <Link to ="/quiksave">
                <div onClick="" className="add-new">
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.973 19.2586H19.2587V32.9729H14.6872V19.2586H0.972961V14.6872H14.6872V0.9729H19.2587V14.6872H32.973V19.2586Z" fill="black"/>
                    </svg>
                </div>
            </Link>           
        </div>
        </div>
    </div>
  )
}

export default Storage;