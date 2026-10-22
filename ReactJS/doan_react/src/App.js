import './App.css';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import MenuAcc from './components/Layout/MenuAcc';
import {UserContext} from './UserContext'

function App(props) {
  const cart = JSON.parse(localStorage.getItem('cart'))
  let  totalCart = 0
  Object.keys(cart).forEach((key,index)=>
  {
    totalCart += cart[key]
    
  })
  console.log(totalCart);
  
  let params1 = useLocation();
  return (
    <UserContext.Provider value={totalCart}>
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
