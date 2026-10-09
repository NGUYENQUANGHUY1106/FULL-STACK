import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BlogList from './components/Blog/BlogList';
import Home from './components/Layout/Home';
import BlogDetails from './components/Blog/BlogDetails';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App >


          <Routes>
            <Route path='/' element = {<Home/>} />
            <Route path='/bloglist' element = {<BlogList />} />
            <Route path='/blogdetails/:id' element = {<BlogDetails />} />
          </Routes>
          {/* Routers là nội dung được truyền vào app */}
        </App>
      
      
      
      </BrowserRouter>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
