import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Categories.css';



function Input() {
  const whatRef = useRef();
  const howRef = useRef();
  const whyRef = useRef();
  const categoryRef = useRef();
  const catSubmitRef = useRef();
  const categoryIdRef = useRef();
  const url = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app";
  const [categories, setCategories] = useState([]);
    const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  
  function onAddMemory() {
    const newMemory = {
        "what": whatRef.current.value,
        "how": howRef.current.value,
        "why": whyRef.current.value,
        
        
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
            "id": Number(categoryIdRef.current.value),
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

    function monitorCat() {
        console.log(catSubmitRef.current.value);
    }
    
    

    return (
        <div>
            <div className="body">
            <div className="column">
                <div className="row1">
                    <div className="title-column">
                        <div className="number">1</div>
                        <div className="question"><label>Content</label> <br /></div>
                    </div>
                    <div className="input-container">
                    <textarea className="input-field" rows="3" cols="45" placeholder="Title, sentence, conversation, thought etc. you want to keep"  ref={whatRef} type="text"/> <br />
                </div>
                 
                </div>
                <div className="row2">
                    <div className="title-column">
                        <div className="number">2</div>
                        <div className="question"><label>Source</label> <br /></div> 
                    </div>
                    <div className="input-container">
                    <textarea className="input-field" rows="3" cols="45" placeholder="Situation, citation, reference, link etc. aka source"  id="how" ref={howRef} type="text" required /> <br /> 
                    </div>
                </div>
                
                <div className="row3">
                    <div className="title-column">
                        <div className="number">3</div>
                        <div className="question"><label>Meaning</label> <br /></div>
                    </div>
                    <div className="input-container">
                    <textarea className="input-field" rows="3" cols="45" placeholder="How is it important to you; what it means to you" ref={whyRef} type="text" required /> <br /> 
                    </div>
                </div>
                      
                
                <button className="submit-button" onClick={() => onAddMemory()}>Store Data</button>
            </div>
            </div>
            <ToastContainer />
        </div>)
}

export default Input;


/* 
<div className="select-category"> 
                  <button onClick={monitorCat}>vajuta</button>
                <h2 class="choose-category">Choose category</h2>
                    <div className='category-buttons'> 
                    
                    {categories.map(element => 
                    <div className='category-container'> 
                                    
                        <div className="cat-button">
                        <input type="radio" ref={catSubmitRef} id={element.id} name="categories" value={element.name} />
                        <label class="btn btn-default" for={element.id}>
                            {element.name}
                        </label>
                            
                        </div>
                        <div className="cat-del-btn">
                            <button className="delete-cat-btn" onClick={() => deleteCategory(element)}>delete</button>
                        </div>
                        
                    </div>)}
                        
                    </div>
                    <div className='add-new-cat'>
                        <label>Add category</label>
                        <div className="add-category-btn">
                            <input ref={categoryRef} type="text" />
                            <input ref={categoryIdRef} type="text" />
                            <button class="btn-add" onClick={() => addCategory()}>+</button>
                        </div>
                        <div>
                        
                        </div>  
                    </div>
                </div>
*/