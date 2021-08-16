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

#### Complete file Index.js
```js
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
```

************************************************************************************************
    
    ### `useRef`

Basically it gives our react app a way to directly work with an element in the DOM.
some times we want direct access to an HTML element for that purpose we use `useRef`.
###### it's always best to avoid direct access to HTML element but some times it's just neccessary.

let's make a scenario where, when the user hover over the black and white image,then it turns to colorful oon hovering.

#### Now creating a new JavaScript functional component in our pages directory, /pages/imageOnHover.js,
#### Remember that with the `Next js` framework . all we have to do to create a new javascript file in our pages directory and the name of that file, becomes the `URL route` when we browse to that site.

#### the way Next JS handles the Static resources, like images, is by default, any thing we put in the folder `/public` is available to our running app, as if they were in the base URL of the website.

Create a folder `/React_hooks/public/static/images`

images we are going to referrence all will begin with `/static/`

```js
function imageOnHover() {
    return (
        <div>
            <img src="/static/speakers/bw/Speaker-187.jpg" alt="" />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <img src="/static/speakers/bw/Speaker-1124.jpg" alt="" />   
        </div>
    )
}
```
Now accessing the Image tag, using `useRef`.
Rename the tag with `<ImageToggleOnMouseOver src="...." alt="" />`


```js
function imageOnHover() {
    return (
        <div>
            <imageToggleOnMouseOver
            primaryImg="/static/speakers/bw/Speaker-187.jpg"
            secondaryImg="/static/speakers/Speaker-187.jpg"
            alt="" />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <imageToggleOnMouseOver
            primaryImage="/static/speakers/bw/Speaker-1124.jpg"
            secondaryImage="/static/speakers/Speaker-1124.jpg"
            alt="" />
        </div>
    )
}
```

with Next JS, we like to put our files in `pages` directory, that are the actual URL routes.
so now let's create a new Source folder `/src/` and put our new functional React component there.

and create a file in Source directory by the name on `/src/ImageToggleOnMouseOver.js`,

```js
// /src/ImageToggleOnMouseOver.js
import React from 'react';

const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {
    return (
        <img src={primaryImg} alt="Primary" />
        
    )
}

export default ImageToggleOnMouseOver;
```
we know we want to handle `onMouseOver, and onMouseOut` events, from our `img` element. so first we add those event attributes to our rendered img element.
somehow when this events triggered we want to swipe, the native img source attribute. which is at this time on primaryImg.

the way it works, is we creates a declared `const` in this case
```js
// /src/ImageToggleOnMouseOver.js
    const imageRef = useRef(null);
```

when the component renders it assign the imgRef to our const. in the Image tag.
and then we use `imageRef.current.src = secondaryImg` or `imageRef.current.src = primaryImg` for the onMouseOver and onMouseOut events respectively.

#### complete File
```js
// /pages/imageOnHover.js
import React from 'react'
import ImageToggleOnMouseOver from '../src/imageToggleOnMouseOver'

function imageOnHover() {
    return (
        <div>
            <ImageToggleOnMouseOver
            primaryImg="/static/speakers/bw/Speaker-187.jpg"
            secondaryImg="/static/speakers/Speaker-187.jpg"
            alt="" />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <ImageToggleOnMouseOver
            primaryImg="/static/speakers/bw/Speaker-1124.jpg"
            secondaryImg="/static/speakers/Speaker-1124.jpg"
            alt="" />
        </div>
    )
}

export default imageOnHover
```

```js
// /src/ImageToggleOnMouseOver.js
import React, {useRef} from 'react';

const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {

    const imageRef = useRef(null);

    return (
        <img
        onMouseOver={() => {
            imageRef.current.src = secondaryImg;
        }}
        onMouseOut={() => {
            imageRef.current.src = primaryImg;
        }}
        src={primaryImg}
        alt="Primary"
        ref={imageRef}
         />
    )
}

export default ImageToggleOnMouseOver;
```

***********************************************************************************************************

### `UseEffect`



