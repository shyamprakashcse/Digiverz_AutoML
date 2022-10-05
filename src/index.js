import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme 
import {BrowserRouter} from "react-router-dom"
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import App from "./components/App/App"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 

  <BrowserRouter>
    <App />
  </BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

