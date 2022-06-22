import React, { useEffect, useRef, useState } from 'react'
import '../css/Categories.scss';

function Categories() {
    
    const categoryRef = useRef();
    
    const [categories, setCategories] = useState([]);
    const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

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
        

  return (
    <div className='add-new-cat'>
        <label>Add category</label>
        <div>
            <input ref={categoryRef} type="text" />
            <button onClick={() => addCategory()}>+</button>
       </div>
    </div>
  )
}

export default Categories;