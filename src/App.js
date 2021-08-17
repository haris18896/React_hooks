import React from 'react';
import Home from './Home.js';
import Speakers from './Speakers.js';

const App = ({pageName}) => {
    if(pageName === 'Home') return <Home />;
    if(pageName === 'Speakers') return <Speakers />;
    return <div>Did Not found </div>;
};

export default App;