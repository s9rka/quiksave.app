import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Categories.scss';
import '../css/Input.scss';
import '../css/Home.scss';
import { HashLink as Link } from 'react-router-hash-link';





function Input() {
  const whatRef = useRef();
  const howRef = useRef();
  const whyRef = useRef();
  const categoryRef = useRef();
  const submitCategoryRef = useRef();
  const categoryIdRef = useRef();
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

    
  
  function onAddMemory() {
    const newMemory = {
        "what": whatRef.current.value,
        "how": howRef.current.value,
        "why": whyRef.current.value,
        "category": checked,    
        /* vaja teha ka kuupäev mil postitati */

    }
    
    fetch(url + "/memories.json", {
      "method": "POST",
      "body": JSON.stringify(newMemory),
      "headers": {"Content-Type": "application/json"}
    });
    
    toast("Data successfully stored", {
        position: "bottom-right",
        autoClose: 3000
    });
    window.location.reload();
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
            <div className="column">
                <div className="row1">
                    <div className="title-column">
                        <div className="number">I</div>
                        <div className="input-heading"><label>Content</label> <br /></div>
                    </div>
                    <div className="input-container">
                    <textarea className="input-field" tabindex="1" rows="3" cols="45" placeholder="Title, sentence, conversation, thought etc. you want to keep"  ref={whatRef} type="text"/> <br />
                    <div class="next-button">
                        <Link to="/#source" class="button button-next">Next</Link>
                        <div>▼</div>
                    </div>
                </div>
                 
                </div>
                <div id="source" tabindex="-1"/>
                <div className="row2">
                    <div className="title-column">
                        <div>▲</div>
                        <div><Link to="/#start" tabindex="-1" className='button button-back'>Previous</Link></div>
                        <div className="number">II</div>
                        <div className="input-heading"><label>Source</label> <br /></div> 
                    </div>
                    <div className="input-container">
                    <textarea className="input-field" tabindex="2" rows="3" cols="45" placeholder="Situation, citation, reference, link etc. aka source"  id="how" ref={howRef} type="text" /> <br />
                    <div class="next-button">
                        <Link to="/#meaning" class="button button-next">Next</Link>
                        <div>▼</div>
                    </div> 
                    </div>
                </div>
                
                <div id="meaning" tabindex="-1"/>
                <div className="row3">
                    <div className="title-column">
                        <div>▲</div>
                        <div><Link to="/#source" tabindex="-1" className='button button-back'>Previous</Link></div>
                        <div className="number">III</div>
                        <div className="input-heading"><label>Meaning</label> <br /></div>
                    </div>
                    <div className="input-container">
                    <textarea className="input-field" tabindex="3" rows="3" cols="45" placeholder="How is it important to you; what it means to you" ref={whyRef} type="text" /> <br /> 
                    <div class="next-button">
                        <Link to="/#tags" class="button button-next">Next</Link>
                        <div>▼</div>
                    </div>
                    </div>
                </div>

                <div id="tags" />
                <div className="row4">
                    <div>▲</div>
                    <div><Link to="/#source" tabindex="-1" className='button button-back'>Previous</Link></div>
                <h2 className="category-heading">Choose Category</h2>
                
                { showGenerator &&
                <div className="tag-generator">
                        <label className='add-new-tag'>Add new tags</label>
                        <input className='tag-input' ref={categoryRef} type="text" />
                        <button className="button-add-tag" onClick={() => addCategory()}>ADD</button>
                    </div> 
                }
                <div className='category-tag-container'>   
                    {categories.map(element => 
                        <div className='category-tags'>
                            <div className="inner">      
                                <input ref={submitCategoryRef} value={JSON.stringify(element.name)} id={element.name} name="category" type="checkbox" onChange={handleCheck} />
                                <label class="button-checkbox" for={element.name}>
                                <svg viewBox="0 0 84.5 84.5">
                                    <path class="box" d="M11,3H81.5a0,0,0,0,1,0,0V73.5a8,8,0,0,1-8,8H3a0,0,0,0,1,0,0V11a8,8,0,0,1,8-8Z"/><path class="check" d="M22.2,22.2H58.3a4,4,0,0,1,4,4V62.3a0,0,0,0,1,0,0H26.2a4,4,0,0,1-4-4V22.2A0,0,0,0,1,22.2,22.2Z"/></svg>
                                    <span>{element.name}</span>
                                </label>
                                { showDelete && <div><button className="button button-delete-tag" onClick={() => deleteCategory(element)}>delete</button></div> }   
                            </div>
                        </div>)}    
                </div>
                <div className="end-column">
                <div className="wrapper">            
                    <div onClick={toggleGenerator} className='button icon'>
                        <span><svg className='fab' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="black"/>
                        </svg>
                        </span>
                        <div className="tooltip">Create tags</div>
                    </div>

                    <div onClick={toggleDelete} className="button icon">
                        <span><svg className='fab' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10ZM17 5V4C17 3.20435 16.6839 2.44129 16.1213 1.87868C15.5587 1.31607 14.7956 1 14 1H10C9.20435 1 8.44129 1.31607 7.87868 1.87868C7.31607 2.44129 7 3.20435 7 4V5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4V20C4 20.7957 4.31607 21.5587 4.87868 22.1213C5.44129 22.6839 6.20435 23 7 23H17C17.7957 23 18.5587 22.6839 19.1213 22.1213C19.6839 21.5587 20 20.7957 20 20V7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H17ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM13 11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11Z" fill="black"/>
                        </svg>
                        </span>
                        <div className="tooltip">Delete tags</div>
                    </div>
                </div>
                    
                <button className="button submit-button" onClick={() => onAddMemory()}>Store Your Mind</button>
                </div>
                </div>

                    
                    
                      
                
                
            </div>
            
            <ToastContainer />
        </div>)
}

export default Input;



