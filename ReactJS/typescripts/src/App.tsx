import React from 'react';

import SwitchButton from './components/SwitchButton';

function App() {
  return (
    <div className="App">
       <SwitchButton propsLight ={true } color='Đỏ' />
       {/* truyền vào switch Button là true thì lúc này nó sẽ hiện là ON */}
    </div>
  );
}

export default App;
