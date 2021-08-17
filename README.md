# React_Hooks

Route
```js
// /pages/emailValidating.js
import React from 'react';

import EmailValidatingForm from '../src/EmailValidatingForm';

function emailValidating(){
    return <EmailValidatingForm />;
}

export default emailValidating;
```

custom Hook API
```js
// /src/useEmailValidation.js
import REact, {useState, useReducer} from 'react';
import useInterval from './useInterval';

function useEmailValidation (seconds){

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const [emailValid, setEmailValid] = useState(false);

    const emailReducer = (state,action) =>{
        const isValidEmail = validateEmail(action);
        setEmailValid(isValidEmail);
        return action;
    };
    const [email, setEmail] = useReducer(emailReducer,"");

    const maxSeconds = 30;
    const [count, setCount] = useState(maxSeconds);

    useInterval(() => {
        setCount(count -1);
    },1000);

    const retObject = {setEmail, count, email, emailValid, setCount};
    return retObject;
}

export default useEmailValidation;
```

```js
// /src/useInterval.js
import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
export default useInterval;
```

Our code for Rendering
```js
// /src/EmailValidatingForm.js
import React, {useState, useReducer} from "react";
import useEmailValidation from "./useEmailValidation";



function EmailValidatingForm() {
    const {setEmail, count, email, emailValid, setCount} = useEmailValidation(30);

    return (
        <div className="container">
          <br />
          <div>
            <div className="content">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={count <= 0}
                value={email}
                placeholder="Enter Email"
                type="email"
                name="email"
                required
              />
              &nbsp;&nbsp;&nbsp;
              <button
                disabled={!emailValid || count <= 0}
                onClick={() => {
                  setCount(0);
                  alert(`button clicked with email ${email}`);
                }}
                className="btn-lg"
                type="submit"
              >
                PRESS ME!
              </button>
              <div>
                {count > 0
                  ? `You Have ${count} Seconds To Enter Your Email`
                  : 'Email Entered or Time Expired'}
              </div>
            </div>
          </div>
        </div>
      );
}

export default EmailValidatingForm;

```

*************************************************************************************************************

next step of loading data from speakerDetail.js

```js
  // const [speakerList, dispatch] = useReducer(speakerReducer, []);
  const [stateObject, dispatch] = useReducer(speakerReducer, []);
  const isLoading = stateObject.isLoading;
  const speakerList  = stateObject.speakerList;
```

the above code is long way. 
so we are going to destructure it.

```js
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakerReducer, {
    isLoading: true,
    speakerList: [],
  });
```

and then remove ```  const [isLoading, setIsLoading] = useState(true);```
because we are already getting this from our `stateReducer`, and for the same reason remove the calls for `setIsLoading` etc.


and then we are going to update speakerReducer.js
Changing the below code
```js
case 'setSpeakerList':{
        return action.data;
      }
```
To
```js
case 'setSpeakerList':{
        return { ...state, speakerList: action.data, isLoading: false };
      }
```
following the same pattern for the other cases.

```js
    switch(action.type){
      case 'setSpeakerList':{
        return { ...state, speakerList: action.data, isLoading: false };
      }
      case 'favorite': {
        return { ...state, speakerList: updateFavorite(true)};
      }
      case 'unfavorite': {
        return { ...state, speakerList: updateFavorite(false)};
      }
```

and then change the `sessionid` to `id`
```js
   function updateFavorite(favoriteValue){
      return state.speakerList.map((item, index) => {
        if(item.id === action.id){
          return {...item, favorite: favoriteValue};
        }
```
also remove the speakerList.filter from useEffect because we are doing the filter all in the code so there is no need of that, the code is given below.

also set the dispatch data to SpeakerData, 

```js
// /src/Speakers.js
  useEffect(() => {
    // setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      // setSpeakerList(SpeakerData);
      // setIsLoading(false);
      // const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
      //   return (sat && speakingSaturday) || (sun && speakingSunday);
      // });
      // // setSpeakerList(speakerListServerFilter);
      dispatch({
        type: 'setSpeakerList',
        // data: speakerListServerFilter
        data: SpeakerData
      });
    });

    return () => {
      console.log('cleanup');
    };
  }, []);
  ```
```js
// /src/Speakers.js
  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);
    dispatch({
      type : favoriteValue === true ? "favorite" : "unfavorite",
      // sessionId: sessionId,
      // sessionId
      id: sessionId,
    });
  },[]);
```

#### Now refactoring this code into a custom react hook.named `useSpeakerDataManager`.
refactor all the given code to custom hook , useSpeakerDataManager
```js
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakerReducer, {
    isLoading: true,
    speakerList: [],
  });


  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch({
        type: 'setSpeakerList',
        data: SpeakerData
      });
    });

    return () => {
      console.log('cleanup');
    };
  }, []);
```

to make custom hook , first of all we have to import all the neccessary imports, and then make a funciton and export it, also the most important thing is to return the data which is going to be used as hook..
e.g
```js
// /src/useSpeakerDataManager.js

//.......

  return {isLoading, speakerList, dispatch};

//.....
```
```js
// /src/uesSpeakerDataManager.js

import React, { useEffect, useReducer} from 'react';
import SpeakerData from './SpeakerData';
import speakerReducer from './speakerReducer';


function useSpeakerDataManager(speakerDataManager) {
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakerReducer, {
    isLoading: true,
    speakerList: [],
  });


  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch({
        type: 'setSpeakerList',
        data: SpeakerData
      });
    });

    return () => {
      console.log('cleanup');
    };
  }, []);
  return {isLoading, speakerList, dispatch};
}

export default useSpeakerDataManager;

```

and then call the custom hook with the returned values being destructured.
```js
  return {isLoading, speakerList, dispatch};
```

so In Speaker.js we are going to use the above custom hook as.
```js
// /src/Speakers.js

//....

import useSpeakerDataManager from './useSpeakerDataManager';

const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  const context = useContext(ConfigContext);

  const {isLoading, speakerList, dispatch} = useSpeakerDataManager();

  const handleChangeSaturday = () => {
    //.....
    //.....
    //.....
```

*********************************************************************************************************

#### favorite Speaker with our useAxiosfetch custom Hook

let's just create a function in our useSpeakerDataManager that will do the dispatch.

1. the function will take the full speaker Record as a parameter.
2. if the current speaker favorite value is true then do a dispatch with the action type unfavorite else vise versa.

```js
// /src/useSpeakerDataManager.js
  function toggleSpeakerfavorite(speakerRec){
    speakerRec.favorite === true ?
        dispatch({type: 'unfavorite', id: speakerRec.id})
        : dispatch({type: "unfavorite", id: speakerRec.id});
  };
```

and then change the return value of dispatch to toggleSpeakerFavorite in useSpeakerDataManager.js also change it in the Speakers.js
```js
  return {isLoading, speakerList, toggleSpeakerFavorite};
```

and then go back to heartFavoriteHandler. and change the dispatch call to `toggleSpeakerfavorite
```js
  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);
    // dispatch({
    //   type : favoriteValue === true ? "favorite" : "unfavorite",
    //   id: sessionId,
    // });
    toggleSpeakerFavorite();
  },[]);
```

now do some changes.
```js
  const heartFavoriteHandler = useCallback((e, speakerRec) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);
    toggleSpeakerFavorite(speakerRec);
  },[]);
```
```js
          <div className="card-deck">
            {speakerListFiltered.map(
              // ({ id, firstName, lastName, bio, favorite }) => {
              ( speakerRec ) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              },
            )}
          </div>
```

and then change all the data to include the `speakerRec` as an attribute. and then removes all the other attributes
```js
        <div className="card-deck">
            {speakerListFiltered.map(
              // ({ id, firstName, lastName, bio, favorite }) => {
              ( speakerRec ) => {
                return (
                  <SpeakerDetail
                    key={speakerRec.id}
                    speakerRec={speakerRec}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              },
            )}
```

and then update the SpeakerDetail.js and then destructure all the data from `speakerRec`
```js
const SpeakerDetail = React.memo(
  // ({ id, firstName, lastName, favorite, bio, onHeartFavoriteHandler }) => {
  ({ speakerRec, onHeartFavoriteHandler }) => {
    const { id, firstName, lastName, bio, favorite } = speakerRec;
    console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);

    return (
      //....
```
```js
// /src/speakerDetail.js
          <button
              // data-sessionid={id}
              className={favorite ? "heartredbutton" : "heartdarkbutton"}
              onClick={(e) => {
                // onHeartFavoriteHandler(e, !favorite);
                onHeartFavoriteHandler(id, speakerRec);
              }}
            />
            <span>
```

**************************************************************************************************

##### Head to the Next branch, favorite isn't yet working, will fix it in the next branch