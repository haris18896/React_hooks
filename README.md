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

### Context

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.



