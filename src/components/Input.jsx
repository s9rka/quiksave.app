import { useRef, useState, useEffect } from 'react';
import '../css/Categories.scss';
import '../css/Input.scss';
import '../css/Home.scss';
import trashicon from '../assets/trashicon.svg';
import addicon from '../assets/addicon.svg';

export default function Input() {
  const noteRef = useRef();
  const categoryRef = useRef();
  const submitCategoryRef = useRef();
  const dateRef = useRef();
  const url = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app";
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
    const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
    const [showGenerator, setShowGenerator] = useState(false);
    const [showDelete, setShowDelete] = useState(false)

    const toggleGenerator = () => {
        setShowGenerator(current => !current);
        noteRef.current.focus();
    }

    const toggleDelete = () => {
        setShowDelete(current => !current);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;

    const [stored, setStored ] = useState([]);
    const memUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"

    useEffect(() => {  
    fetch(memUrl).then(response => response.json())
    .then(responseBody => {
      const notesFromDb = [];
      for (const key in responseBody) {
          notesFromDb.push(responseBody[key]);
        }
      setStored(notesFromDb);
    })
  },[]);
  
  function onAddMemory() {
    const newMemory = {
        "note": noteRef.current.value,
        "category": checked,
        
        /* vaja teha ka kuupäev mil postitati */

    }
    
    fetch(url + "/memories.json", {
      "method": "POST",
      "body": JSON.stringify(newMemory),
      "headers": {"Content-Type": "application/json"}
    });
    stored.push(newMemory);
    setStored(stored.slice());
    
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
        fetch(dbUrl).then(response => response.json())
        .then(responseBody => {
            const categoriesFromDb = [];
            for (const key in responseBody) {
                categoriesFromDb.push(responseBody[key]);
            }
            setCategories(categoriesFromDb);
        });
    },[]);

    function addCategory() {
        const newCategory ={
            "name": categoryRef.current.value,
        }
        fetch(dbUrl, {
            method: "POST",
            body: JSON.stringify(newCategory),
            "headers": {
                "Content-Type": "application/json"
            }
        })
        categories.push(newCategory);
        setCategories(categories.slice());
        categoryRef.current.value = "";
    }

    function deleteCategory(category) {
        const index = categories.findIndex(element => element.name === category.name);
        categories.splice(index,1);
        setCategories(categories.slice());

        fetch(dbUrl, {
            method: "PUT",
            body: JSON.stringify(categories),
            "headers": {
                "Content-Type": "application/json"
            }
        })
    }


    
    
    return (
        <div>
        <div className='row1'>
            <div className="input-container">
                <div ref={dateRef}>{today}</div>
                <textarea className="input-field" placeholder="Start writing"  ref={noteRef} type="text"/> <br />
            </div>

            
            <div className='category-tag-container'>
                <div className="category-heading">
                    <h1>Tag your note</h1>
                    <div className="wrapper"> 
                        
                            <div onClick={toggleGenerator} className={showGenerator ? "manage-tags-active" : "manage-tags"}>
                                <img src={addicon}></img>
                                
                            </div>

                        
                            <div onClick={toggleDelete} className={showDelete ? "manage-tags-active" : "manage-tags"}>
                                <img className='manage-icon' src={trashicon}></img>
                                
                            </div>
                        
                    </div>
                </div>

                { showGenerator &&
                    <div className="tag-generator cf">
                        <input className='tag-input' placeholder="tag name" ref={categoryRef} type="text" />
                        <div className="button-add-tag" onClick={() => addCategory()}>
                            <svg width="32" height="12" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9L30 9V7L0 7L0 9Z" fill="black"/>
                            </svg>
                        </div>
                    </div> 
                }

                <div className='category-tags'>
                {categories.map(element => 
                    <div className="inner">      
                        <input ref={submitCategoryRef} value={JSON.stringify(element.name)} id={element.name} name="category" type="checkbox" onChange={handleCheck} />
                        <label class="button-checkbox" for={element.name}>
                            <svg viewBox="0 0 84.5 84.5">
                                <path class="box" d="M11,3H81.5a0,0,0,0,1,0,0V73.5a8,8,0,0,1-8,8H3a0,0,0,0,1,0,0V11a8,8,0,0,1,8-8Z"/><path class="check" d="M22.2,22.2H58.3a4,4,0,0,1,4,4V62.3a0,0,0,0,1,0,0H26.2a4,4,0,0,1-4-4V22.2A0,0,0,0,1,22.2,22.2Z"/></svg>
                            <span>{element.name}</span>
                        </label>
                    {showDelete && 
                        <div>
                            <button className="button-delete-tag" onClick={() => deleteCategory(element)}>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 20 24">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10ZM17 5V4C17 3.20435 16.6839 2.44129 16.1213 1.87868C15.5587 1.31607 14.7956 1 14 1H10C9.20435 1 8.44129 1.31607 7.87868 1.87868C7.31607 2.44129 7 3.20435 7 4V5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4V20C4 20.7957 4.31607 21.5587 4.87868 22.1213C5.44129 22.6839 6.20435 23 7 23H17C17.7957 23 18.5587 22.6839 19.1213 22.1213C19.6839 21.5587 20 20.7957 20 20V7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H17ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM13 11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11Z" fill="#EB5E55"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    } 
                    </div>)}
                </div>    
                              
            </div>

            

        

        
            
            

            

            

            <button className="button submit-button" onClick={() => onAddMemory()}>Submit</button>
            <div>
        </div>

        </div>
            
        </div>)
}




