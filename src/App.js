import React from 'react';
import Input from "./Input";
import Transaction from "./Transaction";

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      transactionHistory: [],
      id : 0
    };

    this.bookTransaction = this.bookTransaction.bind(this);
  }

  bookTransaction(incomingTransaction){
    console.log("I've made it to bookTransaction");
    console.log(incomingTransaction);

    incomingTransaction.key = this.state.id;

    this.state.transactionHistory.push(incomingTransaction);

    this.setState({
      id: this.state.id + 1
    });
  }

  render(){

    console.log(this.state.transactionHistory);

    let workingTransactionHistory = [].concat(this.state.transactionHistory);
    workingTransactionHistory.sort(function(a,b){
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    console.log(this.state.workingTransactionHistory);

    let outputTransactionHistory = workingTransactionHistory.map(function(item){
      return <Transaction description={item.description} date={item.date} amount={item.amount} type={item.type} key={item.key}/>;

    });

    return (
      <div>
        <Input transactionReceiver={this.bookTransaction}/>
        <div>
        {outputTransactionHistory}
        </div>
      </div>
    );
  }
}

export default App;
