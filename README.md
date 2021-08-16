# React_Hooks

1. #### States.

    ### `useState`

    our plan is we want to hook to the input field, and every time it's value changes, we want to save the new value of the full input field as a react state. and then output that value as a text right below the input field.

    for that we will be using `onChange` event.

calling the useState: `const result = useState("");` it takes a single parameter, which is the initial value of the state. and it returns an array, with the first two values of that array being interest to us.
1. the first value is the what we reference the state it self. in this case our `data model`
2. the 2nd value of the array, is the setter function, that we call to update that state or data model value.
```js
    const result = useState("");
    const inputText = result[0];
    const setInputText = [1];
```

by refactoring we can do the above code as like given below.
```js
    const [inputText, setInputText] = useState("");
```

this way we have achieved our goal.

```js
import React, {useState} from 'react';


const InputElement = () => {
    const [inputText, setInputText] = useState("");

    return (
    <div>
        <input
         onChange={(e) => {
         setInputText(e.target.value);
        }}
         type="text"
         placeholder="Enter some text"
        />
        <br />
        {inputText}
    </div>
    )
}


export default InputElement;

```

Here every key stroke causing a call, to `setInputText` that updates the internal state of our useState call.that internal state is reflected in our variable `inputText`. and then that input text is just output to the screen.


Now let's create a history of the text input changes, and render that history  to the page. 

this time let's create a new state value, that's an array and initialize it with an empty array.
```js
    const [historyList, setHistoryList] = useState([]);
```
now on every input field change event, let's add to the historyList array, the current value of the input field.

```js
    //........

    <input
         onChange={(e) => {
         setInputText(e.target.value);
         setHistoryList([...historyList, e.target.value]);
    //.........
```

now let's output the history array on every key stroke.

```js
        //........

        {inputText} 
        <ul>
            {historyList.map((rec) => {
                return <li>{rec}</li>;
            })}
        </ul>

        //......
```
************************************************************************************************

    ### `useEffect`

