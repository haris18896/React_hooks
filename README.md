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










