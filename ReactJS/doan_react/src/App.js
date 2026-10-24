import './App.css';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import MenuAcc from './components/Layout/MenuAcc';
import {UserContext} from './UserContext'
import { useState,useEffect } from 'react';
import { selectCartItems } from "./components/Redux/cartSlice";
import { useSelector } from "react-redux";

function getStoredObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch (error) {
    return {};
  }
}

function App(props) {


const cart = useSelector(selectCartItems);
// lấy giỏ hàng từ Redux từ slice 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // lưu vào localstorage

const [totalWishList, setTotalWishList] = useState(() => {
  const wishList = getStoredObject("wishList");

  return Object.keys(wishList).length;
});
  
  let params1 = useLocation();
  return (
    <UserContext.Provider value={{
        
        totalWishList,
        setTotalWishList,}}>
    <div className="App">
       <Header />
       <section >
        <div className='container'>
            <div className='row'>

{params1.pathname.includes("account")
  ? <MenuAcc />
  : <MenuLeft />
}                {props.children}
            </div>
        </div>
       </section>
       
       <Footer />
    </div>
    
    </UserContext.Provider>
  );
}

export default App;
