import './App.css';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import MenuAcc from './components/Layout/MenuAcc';

function App(props) {
  let params1 = useLocation();
  return (
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
  );
}

export default App;
