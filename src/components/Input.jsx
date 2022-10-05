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
    const [stored, setStored ] = useState([]);
    const noteRef = useRef();
    const categoryRef = useRef();
    const submitCategoryRef = useRef();
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [showGenerator, setShowGenerator] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const refOne = useRef(null);
    const url = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app";
    const catUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

    const toggleGenerator = () => {
        setShowGenerator(current => !current);
    }

    const toggleDelete = () => {
        setShowDelete(current => !current);
    }

  function onAddMemory() {
    const newMemory = {
        "note": noteRef.current.value,
        "category": checked,
    }

    
    const inputField = document.getElementById('input_field');
    if (noteRef.current.value === "") {
        alert("Empty field cannot be submitted")
    } else if (checked.length < 1) {
        alert("Tag must be applied")
    } else {
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
    inputField.reset();
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
        fetch(catUrl).then(response => response.json())
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
        fetch(catUrl, {
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

        fetch(catUrl, {
            method: "PUT",
            body: JSON.stringify(categories),
            "headers": {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div className='input'>
            <div className="input-container">
                <textarea id="input_field" className="input-field" placeholder="Write here" autoFocus ref={noteRef} type="text"/>
                <div className="category-tag-container">
                    <div className="category-heading">
                        Tag your thought
                        <div className="wrapper"> 
                            <div onClick={toggleGenerator} className={showGenerator ? "manage-tags-active" : "manage-tags"}>
                                <img src={addicon} alt="add-icon"></img>            
                            </div>
                            <div onClick={toggleDelete} className={showDelete ? "manage-tags-active" : "manage-tags"}>
                                <img className='manage-icon' src={trashicon} alt="trash-icon"></img>       
                            </div>
                        </div>
                    </div>

                    <div className='category-tags'>
                    {categories.map(element => 
                        <div className="inner">      
                            <input required ref={submitCategoryRef} value={JSON.stringify(element.name)} id={element.name} name="category" type="checkbox" onChange={handleCheck} />
                            <label class="button-checkbox" for={element.name}>
                                <svg viewBox="0 0 84.5 84.5">
                                    <path class="box" d="M11,3H81.5a0,0,0,0,1,0,0V73.5a8,8,0,0,1-8,8H3a0,0,0,0,1,0,0V11a8,8,0,0,1,8-8Z"/><path class="check" d="M22.2,22.2H58.3a4,4,0,0,1,4,4V62.3a0,0,0,0,1,0,0H26.2a4,4,0,0,1-4-4V22.2A0,0,0,0,1,22.2,22.2Z"/>
                                </svg>
                                <span>{element.name}</span>
                            </label>
                            
                        {showDelete && 
                            <div className='delete-tag-container'>
                                <button className="button-delete-tag" onClick={() => deleteCategory(element)}>
                                    <span>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.16667 16.4997C9.40978 16.4997 9.64294 16.4031 9.81485 16.2312C9.98676 16.0593 10.0833 15.8261 10.0833 15.583V10.083C10.0833 9.83989 9.98676 9.60673 9.81485 9.43483C9.64294 9.26292 9.40978 9.16634 9.16667 9.16634C8.92355 9.16634 8.69039 9.26292 8.51849 9.43483C8.34658 9.60673 8.25 9.83989 8.25 10.083V15.583C8.25 15.8261 8.34658 16.0593 8.51849 16.2312C8.69039 16.4031 8.92355 16.4997 9.16667 16.4997ZM18.3333 5.49967H14.6667V4.58301C14.6667 3.85366 14.3769 3.15419 13.8612 2.63846C13.3455 2.12274 12.646 1.83301 11.9167 1.83301H10.0833C9.35399 1.83301 8.65451 2.12274 8.13879 2.63846C7.62306 3.15419 7.33333 3.85366 7.33333 4.58301V5.49967H3.66667C3.42355 5.49967 3.19039 5.59625 3.01849 5.76816C2.84658 5.94007 2.75 6.17323 2.75 6.41634C2.75 6.65946 2.84658 6.89261 3.01849 7.06452C3.19039 7.23643 3.42355 7.33301 3.66667 7.33301H4.58333V17.4163C4.58333 18.1457 4.87306 18.8452 5.38879 19.3609C5.90451 19.8766 6.60399 20.1663 7.33333 20.1663H14.6667C15.396 20.1663 16.0955 19.8766 16.6112 19.3609C17.1269 18.8452 17.4167 18.1457 17.4167 17.4163V7.33301H18.3333C18.5764 7.33301 18.8096 7.23643 18.9815 7.06452C19.1534 6.89261 19.25 6.65946 19.25 6.41634C19.25 6.17323 19.1534 5.94007 18.9815 5.76816C18.8096 5.59625 18.5764 5.49967 18.3333 5.49967ZM9.16667 4.58301C9.16667 4.33989 9.26324 4.10674 9.43515 3.93483C9.60706 3.76292 9.84022 3.66634 10.0833 3.66634H11.9167C12.1598 3.66634 12.3929 3.76292 12.5648 3.93483C12.7368 4.10674 12.8333 4.33989 12.8333 4.58301V5.49967H9.16667V4.58301ZM15.5833 17.4163C15.5833 17.6595 15.4868 17.8926 15.3148 18.0645C15.1429 18.2364 14.9098 18.333 14.6667 18.333H7.33333C7.09022 18.333 6.85706 18.2364 6.68515 18.0645C6.51324 17.8926 6.41667 17.6595 6.41667 17.4163V7.33301H15.5833V17.4163ZM12.8333 16.4997C13.0764 16.4997 13.3096 16.4031 13.4815 16.2312C13.6534 16.0593 13.75 15.8261 13.75 15.583V10.083C13.75 9.83989 13.6534 9.60673 13.4815 9.43483C13.3096 9.26292 13.0764 9.16634 12.8333 9.16634C12.5902 9.16634 12.3571 9.26292 12.1852 9.43483C12.0132 9.60673 11.9167 9.83989 11.9167 10.083V15.583C11.9167 15.8261 12.0132 16.0593 12.1852 16.2312C12.3571 16.4031 12.5902 16.4997 12.8333 16.4997Z" fill="#7C0B2B"/>
                                    </svg>
                                    </span>
                                </button>
                            </div>
                        } 
                        </div>)}
                        <div className="new-tag">
                            { showGenerator &&
                            <div className="tag-generator cf">
                                <div ref={refOne} className="generator-container">
                                    <input autoFocus className='tag-input' placeholder="Tag name" ref={categoryRef} type="text" />
                                        <div className="button-add-tag" onClick={() => addCategory()}>
                                            <img src={addicon} alt="add-icon"></img>
                                        </div>
                                </div>
                            </div> 
                            }        
                        </div>
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
                            </svg>Quiksave
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
            <div className="my-notes">
                <Link className='link' to ="/storage">
                    <div className="notes-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5.50002H12.72L12.4 4.50002C12.1926 3.91325 11.8077 3.40553 11.2989 3.04718C10.7901 2.68884 10.1824 2.49762 9.56 2.50002H5C4.20435 2.50002 3.44129 2.81609 2.87868 3.3787C2.31607 3.94131 2 4.70437 2 5.50002V18.5C2 19.2957 2.31607 20.0587 2.87868 20.6213C3.44129 21.184 4.20435 21.5 5 21.5H19C19.7956 21.5 20.5587 21.184 21.1213 20.6213C21.6839 20.0587 22 19.2957 22 18.5V8.50002C22 7.70437 21.6839 6.94131 21.1213 6.3787C20.5587 5.81609 19.7956 5.50002 19 5.50002ZM20 18.5C20 18.7652 19.8946 19.0196 19.7071 19.2071C19.5196 19.3947 19.2652 19.5 19 19.5H5C4.73478 19.5 4.48043 19.3947 4.29289 19.2071C4.10536 19.0196 4 18.7652 4 18.5V5.50002C4 5.23481 4.10536 4.98045 4.29289 4.79292C4.48043 4.60538 4.73478 4.50002 5 4.50002H9.56C9.76964 4.49948 9.97416 4.56484 10.1446 4.68686C10.3151 4.80889 10.4429 4.9814 10.51 5.18002L11.05 6.82002C11.1171 7.01864 11.2449 7.19116 11.4154 7.31318C11.5858 7.4352 11.7904 7.50056 12 7.50002H19C19.2652 7.50002 19.5196 7.60538 19.7071 7.79292C19.8946 7.98045 20 8.23481 20 8.50002V18.5Z" fill="black"/>
                        </svg>
                        Storage
                    </div>
                </Link>        
            </div>
        </div>)
}