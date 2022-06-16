import { useState } from 'react';

function Test({radios}) {
    const [selected, setSelected] = useState();
  
    const handleClick = radio => event => setSelected(radio);
  
    const handleSubmit = () => {
      let msg = selected 
        ? "Selected radio: " + selected
        : "Nothing Selected!";
      alert(msg);
    }
    
    return(
      <div>
        <ul className="settings">
          {radios && radios.map(r => {
            return (
              <li>
                <label>
                  <input onClick={handleClick(r)} type="radio" name="settings" />
                  {r}
                </label>
              </li>
            )
          })}
        </ul>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
}

export default Test;