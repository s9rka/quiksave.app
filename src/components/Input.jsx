import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Input() {
  const whatRef = useRef();
  const howRef = useRef();
  const whyRef = useRef();
  const url = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app";
  

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
                    <textarea className="input-field" rows="3" cols="45" placeholder="Title, sentence, conversation, thought etc. you want to keep"  ref={whatRef} type="text" autoFocus/> <br />
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