import React from 'react';
import Input from "./Input";

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <Input transactionReceiver=""/>
      </div>
    );
  }
}

export default App;
