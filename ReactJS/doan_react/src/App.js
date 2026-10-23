import './App.css';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import MenuAcc from './components/Layout/MenuAcc';
import {UserContext} from './UserContext'
import { useState } from 'react';

function getStoredObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch (error) {
    return {};
  }
}

function App(props) {
const [totalCart, setTotalCart] = useState(() => {
  const cart = getStoredObject("cart");

  let total = 0;

  Object.keys(cart).forEach((key) => {
    total += Number(cart[key]);
  });

  return total;
  //  lúc này totalCart = total 
});

const [totalWishList, setTotalWishList] = useState(() => {
  const wishList = getStoredObject("wishList");

  return Object.keys(wishList).length;
});
  
  let params1 = useLocation();
  return (
    <UserContext.Provider value={{totalCart,
        setTotalCart,
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
