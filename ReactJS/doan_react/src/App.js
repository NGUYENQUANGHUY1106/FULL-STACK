import './App.css';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';

function App(props) {
  return (
    <div className="App">
       <Header />
       <section >
        <div className='container'>
            <div className='row'>
                <MenuLeft />
                {props.children}
            </div>
        </div>
       </section>
       
       <Footer />
    </div>
  );
}

export default App;
