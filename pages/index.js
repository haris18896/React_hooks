import React, {useState} from 'react';


const InputElement = () => {
    const [inputText, setInputText] = useState("");
    const [historyList, setHistoryList] = useState([]);

    return (
    <div>
        <input
         onChange={(e) => {
         setInputText(e.target.value);
         setHistoryList([...historyList, e.target.value]);
        }}
         type="text"
         placeholder="Enter some text"
        />
        <br />
        {inputText} 
        <ul>
            {historyList.map((rec) => {
                return <li>{rec}</li>;
            })}
        </ul>
    </div>
    )
}


export default InputElement;