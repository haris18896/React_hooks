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
