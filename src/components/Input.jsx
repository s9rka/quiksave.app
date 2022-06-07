import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Input() {
  const whatRef = useRef();
  const howRef = useRef();
  const whyRef = useRef();
  const url = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app";
  const [isLoading, setIsLoading] = useState(false);

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
            <div className="row">
                <div className="column1">
                    <div className="number">1</div>
                    <div className="question"><label>Content</label> <br /></div>
                     
                    <textarea rows="5" cols="45" placeholder="title, sentence, conversation, thought etc. you want to keep" className="input-field" ref={whatRef} type="text" autoFocus/> <br />
                </div>
                <div className="column2">
                    <div className="number">2</div>
                    <div className="question"><label>Source</label> <br /></div> 
                    <textarea rows="5" cols="45" placeholder="situation, citation, reference, link etc. aka source" className="input-field" id="how" ref={howRef} type="text" required /> <br />
                </div>
                <div className="column3">
                    <div className="number">3</div>
                    <div className="question"><label>Meaning</label> <br /></div>
                    <textarea rows="5" cols="45" placeholder="how is it important to you; what it means to you" className="input-field" ref={whyRef} type="text" required /> <br /> 
                </div>
                <button className="submit-button" onClick={() => onAddMemory()}>Store Data</button>
            </div>
            <ToastContainer />
        </div>)
}

export default Input;