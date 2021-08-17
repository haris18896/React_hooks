# React_Hooks

## `Advance React Hooks.`

### useContext, useReducer, useCallback, useMemo

Install the following Dependencies

```
npm i eslint-plugin-react-hooks
npm i eslint
npm i eslint-plugin-react
npm i prettier
npm i react-hooks
npm i react-performance
npm install react-bootstrap@next bootstrap@5.0.2
npm install bootstrap react-toastify
```

and then create a file `.eslintrc.json` and paste the following code in that file

```json
// /.eslintrc.json
{
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react-hooks"],
  "rules": {
    "semi": [2, "always"],
    "react-hooks/rules-of-hooks": "error"
  }
}
```

#####  to include `CSS` we have to create some special JavaScript file `_app.js` in our pages directory.
```js
// /pages/_app.js
import "../public/static/site.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps}) {
    return <Component {...pageProps} />;
}
```

### useContext

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.


we will be creating our `Shared context` in `/src/App.js` because all routes we ever plan to make will share this App component.
```js
// /src/App.js

//.....
export const ConfigContext = React.createContext();
//....
```
this is all we need to create context for our entire app.

in our `return` of our `App.js` component, we wrap our page to show with `ConfigContext.Provider`

```js
// /src/App.js
import React from 'react';
import Home from './Home.js';
import Speakers from './Speakers.js';

export const ConfigContext = React.createContext();

const pageToShow = pageName => {
    if(pageName === 'Home') return <Home />;
    if(pageName === 'Speakers') return <Speakers />;
    return <div>Did Not found </div>;
};

const App = ({pageName}) => {
    return (
        <ConfigContext.Provider>
            <div>{pageToShow(pageName)}</div>
        </ConfigContext.Provider>
    );
};

export default App;

```

we also pass the attribute `value` to the `ConfigContext.Provider` which can be any JavaScript Object.

here we will create an Object `configValue` and will add `showSpeakerSpeakingDays` attribute to it, and set that attribute to `true` ,

and then we will assign that `configValue` object to the Provider attribute value.

```js
// /src/App.js

//...........
const configValue = {
    showSpeakerSpeakingDays : true,
};

const App = ({pageName}) => {
    return (
        <ConfigContext.Provider value={configValue}>
            <div>{pageToShow(pageName)}</div>
        </ConfigContext.Provider>
    );
};

```
Now it's time to use that `showSpeakerSpeakingDays` attribute into our code, so that if we change it from `true` to `false` the object will not be shown again until we change it again to `true`

in `Spkeakers.js` first of all import `useContext` from `react` library, and then import `ConfigContext` from App.js

```js
// /src/Speakers.js
import React, { useEffect, useState, useContext } from 'react';

import { ConfigContext } from './App.js';
```

then in our functional component , reference `context`  with our `useContext` hook.

```js
   const context = useContext(ConfigContext);
```

and then put the code in that context api, weather to show it or hide it.
```js
// /src/Speakers.js
        {context.showSpeakerSpeakingDays === false ? null : (
          <div className="hide">
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSaturday}
                  checked={speakingSaturday}
                />
                Saturday Speakers
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSunday}
                  checked={speakingSunday}
                />
                Sunday Speakers
              </label>
            </div>
          </div>
        )};

```

check the days, by turning `showSpeakerSpeakingDays` to `false` in App.js
(worked)


make some more context and use it like above.
```js
// /src/App.js

const configValue = {
    showSpeakerSpeakingDays : false,
    showSignMeUp : false,
};
```

```js
// /src/SignMeUp.js
import React, {useState, useContext} from 'react';
import { ConfigContext } from './App';

function SignMeUp({signupCallback}) {
    const [email , setEmail] = useState('');
    const context =  useContext(ConfigContext);

    return context.showSignMeUp === false ? null : (

      //.........

```
*************************************************************************************************************

### `useReducer`

useState is built with useReducer under it.

a `Reducer` is simply a function that takes in a previous state as the first parameter, and Action as the second parameter, and then returns a new state.

```(previousState, Action) => newState```

Now we are going to convert this 
```js
const [speakerList, setSpeakerList] = useState([]);
```
 code of Speakers.js Using `useReducer` which result as 
```js
  const [speakerList, setSpeakerList] = useReducer((state, action) => action, []);
```
#### Notice: the first parameter passed to the useReducer react hook ```(state, action) => action``` is our bioler plate reducer and the second parameter is what to initialze our state to ``` []``` which is an empty array

######## check the website, everything working as same..

writing the same thing like this.
```js
  function speakerReducer (state, action){
    return action;
  }

  const [speakerList, setSpeakerList] = useReducer(speakerReducer, []);

```

Now we are going to write a  `Switch case` in the function Reducer.

```js
  function speakerReducer (state, action){
    switch(action.type){
      case 'setSpeakerList':{
        return action.data;
      }
      default:
        return state;
    }
  }

  const [speakerList, setSpeakerList] = useReducer(speakerReducer, []);

  ```
In the above code, If the `action.type` is `setSpeakerList` then we are going to return the action data as our new state. by default the reducer will return whatever the current state that was passed in.


changing `setSpeakerList` to `dispatch`
```js
 const [speakerList, dispatch] = useReducer(speakerReducer, []);
 ```
when we call `dispatch` the `useReducer` code call `speakerReducer` from our side. and then the speakerReducer function runs and check for the cases.

we can think of `dispatch` as the same thing as calling the function `speakerReducer`.


Now we have to update the `useEffect` function `setSpeakerList` to `dispatch`, with the first parameter being the object and the attribute

we are going to change this code
```js
useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      // setSpeakerList(SpeakerData);
      setIsLoading(false);
      const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
        return (sat && speakingSaturday) || (sun && speakingSunday);
      });
      setSpeakerList(speakerListServerFilter);
    });

```

in the above code we are going to call dispatch instead of setSpeakerList.

```js
// setSpeakerList(speakerListServerFilter);
      dispatch({
        type: 'setSpeakerList',
        data: speakerListServerFilter
      });
    });
```

##### we can think of useState as a useReducer with default action type.
and Now we can create more action types as we need them.

#### useReducer with multiple Dispatched Actions.
#### Reducer for heartFavouriteHandler.
at this point we are going to add action to our speakerReducer function for favorite items.

```js
  function speakerReducer (state, action){
    switch(action.type){
      case 'setSpeakerList':{
        return action.data;
      }
      case 'favorite': {
        return state;
      }
      case 'unfavorite': {
        return state;
      }
      default:
        return state;
    }
  }
```
at this point the cases return the current state, so it's not doing any thing for know.
```js
  const heartFavoriteHandler = (e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.atrributes['data-sessionid'].value);
    // setSpeakerList(
    //   speakerList.map((item) => {
    //     if (item.id === sessionId) {
    //       return { ...item, favorite: favoriteValue };
    //     }
    //     return item;
    //   }),
    // );
    dispatch({
      type : favoriteValue === true ? "favorite" : "unfavorite",
      // sessionId: sessionId,
      sessionId
    });
  };

```

Now coding our actions in speakerReducer function.
```js
      case 'favorite': {
        return state.map((item, index) => {
          return item;
        });
      }

```

Now if the item id, matches the session id or any of the speaker records,  then update that record to favorite value.
```js
      case 'favorite': {
        return state.map((item, index) => {
          if(item.id === action.sessionId){
            item.favorite === true;
          }
          return item;
        });
      }

```

as the `unfavorite` code is also similar so we are going to make a function out of it.
```js
  function speakerReducer (state, action){

    function updateFavorite(favoriteValue){
      return state.map((item, index) => {
        if(item.id === action.sessionId){
          return {...item, favorite: favoriteValue};
        }
        return item;
      });
    }
    switch(action.type){
      case 'setSpeakerList':{
        return action.data;
      }
      case 'favorite': {
        return updateFavorite(true);
      }
      case 'unfavorite': {
        return updateFavorite(false);
      }

```
the final step in useReducer is to make a separate file for it.
/src/speakerReducer.js and then import it back in the Speakers.js


```js
// /src/speakerReducer.js
function speakerReducer (state, action){
    function updateFavorite(favoriteValue){
      return state.map((item, index) => {
        if(item.id === action.sessionId){
          return {...item, favorite: favoriteValue};
        }
        return item;
      });
    }
    switch(action.type){
      case 'setSpeakerList':{
        return action.data;
      }
      case 'favorite': {
        return updateFavorite(true);
      }
      case 'unfavorite': {
        return updateFavorite(false);
      }
      default:
        return state;
    }
  }

export default speakerReducer;
```
***********************************************************************************************************

### useCallback and useMemo

they are both used to memoize.

with useCallback memoizing a function, and useMemo memoizing the value.

#### Note: Memoization is an optimization technique for returning cache results.

the Hook `useCallback` cache a function and `useMemo` cache a value.

when clicking the heart symbol for favorite, it renders all the images, to check add this line to speakerDetail.js and you will at one click on the heart symbol that every things rerendered. so it elimiate this thing we use  `useCallback` and `useMemo`.

```js
  console.log(`SpeakerDetail:${id} ${firstName} ${lastName}  ${favorite}`);
```
first of all we have to import useCallback and useMemo in  our Speakers.js

```js
// /src/Speakers.js
import React, { useEffect, useState, useContext, useReducer, useCallback } from 'react';
```

and then wrap the function in useCallback and the return of callback caches that value.
```js
// /src/Speaker.js
  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);
    dispatch({
      type : favoriteValue === true ? "favorite" : "unfavorite",
      // sessionId: sessionId,
      sessionId
    });
  },[]);
```
Now we also have to `Memoize` the `speakerDetail.js` page is returning.
```js
///src/speakerDetail..js
import ImageToggleOnScroll from './ImageToggleOnScroll';

const SpeakerDetail = React.memo({
  id,
  firstName,
  lastName,
  favorite,

  //.......

```

Now it's working perfectly, you can check it in console.

***************************************

### using Memo to optimize and Retriving data

in `useMemo` the first parameter is the function that we want to memoize, and the second parameter is the dependencies, as it were in useEffect

as we cannot pass any hook in loop or condition. so we have to make another function for that in this case
```js
  const newSpeakerList = useMemo(
    () => speakerList
    .filter(
      ({ sat, sun }) =>
        (speakingSaturday && sat) || (speakingSunday && sun),
    )
    .sort(function (a, b) {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    }),[speakingSaturday, speakingSunday, speakerList]);

  const speakerListFiltered = isLoading
    ? []
    : newSpeakerList;
```




