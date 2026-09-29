import './App.css';
import A from './components/BTVN/A.js';
// import Vidu2 from './components/Vidu2.js';
import A_1  from './components/BTVN/A_1.js';

// const arr =["iphone1","iphone2","iphone3" ,"iphone4","iphone5"]
// const obj = {
//   name : "Quang huy",
//   age :  18
// }
function App() {
  const numbers = [1,2,3,4,5]
  const double = numbers.map((numbers)=> numbers*2)
  return (
    <div className="App">
      <h2>{double}</h2>
      {/* <Numberlist data = {numbers}/> */}
      {/* <Test2/> */}
      <A />

      <hr/>
      <A_1/>
    </div>
  );
}

export default App;
