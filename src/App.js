import React from 'react';
import Input from "./Input";

class App extends React.Component {
  constructor(){
    super();
  }

  bookTransaction(incomingTransaction){
    console.log("I've made it to bookTransaction");
    console.log(incomingTransaction);
  }

  render(){
    return (
      <div>
        <Input transactionReceiver={this.bookTransaction}/>
      </div>
    );
  }
}

export default App;
