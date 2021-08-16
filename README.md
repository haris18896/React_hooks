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

