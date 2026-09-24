import './App.css';
// import Button from './btn';
// import Footer from './footer';
// import Header from './header';
import Header from './components/Header'; 
import Content from './components/Content';
import Footer from './components/Footer';
import MenuLeft from './components/Menu_left';
function App(props) {
  // console.log(props.data);
  // let arr = [1,2,3,4,5];
  // let name = 'Hello Các bạn'
  // let arr_list = ['Home', 'About', 'Contact', 'Blog', 'Login'];
  return (
    <div className="App">
      {/* <Header data1 = {arr} /> */}
      {/* <h1>Học js ngày 1</h1>
      <p>{props.data}</p>
       */}
       <Header/>
       <MenuLeft/>
       <Content/>
       <Footer/>
       
      
      {/* <Button data_name = {name}/>
      <Footer data_list = {arr_list}/> */}
    </div>
  );
}

export default App;
