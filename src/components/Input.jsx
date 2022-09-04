import { useRef, useState, useEffect } from 'react';
import '../css/Categories.scss';
import '../css/Input.scss';
import '../css/Home.scss';
import trashicon from '../assets/trashicon.svg';
import addicon from '../assets/addicon.svg';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        
    }

    const toggleDelete = () => {
        setShowDelete(current => !current);
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, [])

    const refOne = useRef(null);

    const handleClickOutside = (e) => {
        if(!refOne.current.contains(e.target)) {
            setShowGenerator(current => !current);
        } else {
            
        }
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
        setShowGenerator(current => !current);
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
            
            { showGenerator &&
                    <div className="tag-generator cf">
                        <div ref={refOne} className="generator-container">
                            <input autoFocus className='tag-input' placeholder="Name Your Tag" ref={categoryRef} type="text" />
                            <div className="button-add-tag" onClick={() => addCategory()}>
                                <svg className='fab' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#2D2C2C"/>
                                </svg>
                            </div>
                        </div>
                    </div> 
                }
            <div className={showGenerator ? "input-container-active" : "input-container"}>
            <div className="my-notes">
                <Link className='link' to ="/storage">
                    <div className="notes-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5.50002H12.72L12.4 4.50002C12.1926 3.91325 11.8077 3.40553 11.2989 3.04718C10.7901 2.68884 10.1824 2.49762 9.56 2.50002H5C4.20435 2.50002 3.44129 2.81609 2.87868 3.3787C2.31607 3.94131 2 4.70437 2 5.50002V18.5C2 19.2957 2.31607 20.0587 2.87868 20.6213C3.44129 21.184 4.20435 21.5 5 21.5H19C19.7956 21.5 20.5587 21.184 21.1213 20.6213C21.6839 20.0587 22 19.2957 22 18.5V8.50002C22 7.70437 21.6839 6.94131 21.1213 6.3787C20.5587 5.81609 19.7956 5.50002 19 5.50002ZM20 18.5C20 18.7652 19.8946 19.0196 19.7071 19.2071C19.5196 19.3947 19.2652 19.5 19 19.5H5C4.73478 19.5 4.48043 19.3947 4.29289 19.2071C4.10536 19.0196 4 18.7652 4 18.5V5.50002C4 5.23481 4.10536 4.98045 4.29289 4.79292C4.48043 4.60538 4.73478 4.50002 5 4.50002H9.56C9.76964 4.49948 9.97416 4.56484 10.1446 4.68686C10.3151 4.80889 10.4429 4.9814 10.51 5.18002L11.05 6.82002C11.1171 7.01864 11.2449 7.19116 11.4154 7.31318C11.5858 7.4352 11.7904 7.50056 12 7.50002H19C19.2652 7.50002 19.5196 7.60538 19.7071 7.79292C19.8946 7.98045 20 8.23481 20 8.50002V18.5Z" fill="black"/>
                        </svg>
                        <div className='notes-text'>Storage</div>
                    </div>
                </Link>        
            </div>
                <textarea className="input-field" placeholder="Write here" autoFocus ref={noteRef} type="text"/>

                <div className="category-tag-container">
                <div className="category-heading">
                    Tag your thought
                    <div className="wrapper"> 
                        
                            <div onClick={toggleGenerator} className={showGenerator ? "manage-tags-active" : "manage-tags"}>
                                <img src={addicon}></img>
                                
                            </div>

                        
                            <div onClick={toggleDelete} className={showDelete ? "manage-tags-active" : "manage-tags"}>
                                <img className='manage-icon' src={trashicon}></img>
                                
                            </div>
                        
                    </div>
                </div>

                

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
                        <div className='delete-tag-container'>
                            <button className="button-delete-tag" onClick={() => deleteCategory(element)}>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 20 24">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10ZM17 5V4C17 3.20435 16.6839 2.44129 16.1213 1.87868C15.5587 1.31607 14.7956 1 14 1H10C9.20435 1 8.44129 1.31607 7.87868 1.87868C7.31607 2.44129 7 3.20435 7 4V5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4V20C4 20.7957 4.31607 21.5587 4.87868 22.1213C5.44129 22.6839 6.20435 23 7 23H17C17.7957 23 18.5587 22.6839 19.1213 22.1213C19.6839 21.5587 20 20.7957 20 20V7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H17ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM13 11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11Z" fill="#7C0B2B"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    } 
                    </div>)}
                </div>
                <div className="button-container">
                    <div className="submit-button" onClick={() => onAddMemory()}>
                        <svg className='logo-on-button' width="140" height="140" viewBox="0 0 205 178" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M153.435 88.7793L203.825 118.373L153.435 147.967L102.479 177.561V118.373L153.435 88.7793Z" fill="black"/>
            <path d="M51.5223 88.7793L0 118.373L51.5223 147.967L102.478 177.561V118.373L51.5223 88.7793Z" fill="black"/>
            <path d="M0.565918 59.1855V118.373L51.522 147.967V88.7795L0.565918 59.1855Z" fill="black"/>
            <path d="M204.391 59.6934V118.523L153.78 147.938V89.1082L204.391 59.6934Z" fill="black"/>
            <path d="M205 59.0742V118.262L153.78 147.856V88.6681L205 59.0742Z" fill="black"/>
            <path d="M102.441 59.0744L51.2203 88.6683L0 59.0744L51.2203 29.4805L102.441 59.0744Z" fill="black"/>
            <path d="M153.661 29.48L102.44 59.0739L51.2202 29.48L102.44 0L153.661 29.48Z" fill="black"/>
            <path d="M153.661 118.375L102.44 147.969L51.2202 118.375L102.44 88.7812L153.661 118.375Z" fill="white"/>
            <path d="M153.661 88.7814L102.44 118.375L51.2202 88.7814L102.44 59.1875L153.661 88.7814Z" fill="white"/>
            <path d="M204.881 59.0744L153.661 88.6683L102.44 59.0744L153.661 29.4805L204.881 59.0744Z" fill="black"/>
                        </svg>Store Your Mind
                    </div>
                    <ToastContainer id="toast-container"
                    position="bottom-center"
                    autoClose={4000}
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
            </div>
            <div>
        </div>

        </div>
            
        </div>)
}




