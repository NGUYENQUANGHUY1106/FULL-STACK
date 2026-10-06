import './App.css';
import Login_BT from './components/BT/Login_BT';
import Register from './components/BT/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>Helo</h1>
      <Login />
      <Register />
      <Login_BT />
    </div>
  );
}

export default App;
