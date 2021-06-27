import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {AppContextProvider} from './AppContext';
import { CookiesProvider } from 'react-cookie';

<<<<<<< HEAD
require('dotenv').config();

=======
>>>>>>> b804c165b6a5a9876a27993715b0ec1c7e6f4b9d
const RootComponent = ()=>{
    return (
      <React.StrictMode>
        <AppContextProvider>  
          <CookiesProvider>
            <App />
          </CookiesProvider> 
        </AppContextProvider>
      </React.StrictMode>
    );
}

ReactDOM.render(
  <RootComponent />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
