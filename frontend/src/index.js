import React from 'react';
import ReactDOM from 'react-dom/client';
import StyleProvider from './context/StyleProvider';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyleProvider >
    <App />
    </StyleProvider>
  
);

