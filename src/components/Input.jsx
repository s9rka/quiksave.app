import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Categories.scss';
import '../css/Input.scss';
import '../css/Home.scss';
import { HashLink as Link } from 'react-router-hash-link';
import Breadcrumbs from './Breadcrumbs';




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
            < Breadcrumbs />
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
                        <Link to="/#start" class="button button-next">Next</Link>
                        <div>▼</div>
                    </div>
                    </div>
                </div>
                
                {categories.map(element => 
                <div className='category-container'>           
                        <div className="cat-button">
                        <input ref={submitCategoryRef} value={JSON.stringify(element.name)} id={element.name} name="category" type="checkbox" onChange={handleCheck} />
                        <label class="btn btn-default" for={element.name}>
                            {element.name}
                        </label>
                        <button className="delete-cat-btn" onClick={() => deleteCategory(element)}>delete</button>
                        </div>   
                </div>)}

                <div className='add-new-cat'>
                    <label>Add category</label>
                    <input ref={categoryRef} type="text" />
                    <button onClick={() => addCategory()}>ADD</button>
                </div>
                    
                      
                
                <button className="submit-button" onClick={() => onAddMemory()}>Store Data</button>
            </div>
            
            <ToastContainer />
        </div>)
}

export default Input;



