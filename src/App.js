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
	this.fetchTransactionsFromMemory = this.fetchTransactionsFromMemory.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.obtainIdToUseForIncomingTransaction = this.obtainIdToUseForIncomingTransaction.bind(this);
  }

  obtainIdToUseForIncomingTransaction(){
      let objectTransactionsFromMemory = this.fetchTransactionsFromMemory();

      let last = 0;
      if(objectTransactionsFromMemory){
          if(objectTransactionsFromMemory.history.length > 1){
              objectTransactionsFromMemory.history.sort(function(a,b){
                  const alpha = a.key;
                  const bravo = b.key;
                  return alpha - bravo;
              });

              last = objectTransactionsFromMemory.history[objectTransactionsFromMemory.history.length-1].key + 1;
          } else {
             last = 1;
          }
      }
      return last;
}

  fetchTransactionsFromMemory(){
	  let transactionsFromMemory = localStorage.getItem("memory");
      console.log(transactionsFromMemory);
      return JSON.parse(transactionsFromMemory);
  };

  bookTransaction(incomingTransaction){
    console.log("I've made it to bookTransaction");
    console.log(incomingTransaction);

    this.updateHistory(this.obtainIdToUseForIncomingTransaction(), incomingTransaction);
    // if(objectTransactionsFromMemory){
    //     let last = 0;
    //     if(objectTransactionsFromMemory.history.length > 1){
    //         objectTransactionsFromMemory.history.sort(function(a,b){
    //             const alpha = a.key;
    //             const bravo = b.key;
    //             return alpha - bravo;
    //         });
    //
    //         last = objectTransactionsFromMemory.history[objectTransactionsFromMemory.history.length-1].key;
    //     }
    //     console.log('1 ', this.state);
    //     console.log(last + 1);
    //     const newId = last + 1;
    //     this.setState({
    //         id: newId
    //     });
    //
    //     console.log('2 ', this.state);
    // } else {
    // let objectTransactionsFromMemory = this.fetchTransactionsFromMemory();
    //
    // if (!objectTransactionsFromMemory) {
    //     objectTransactionsFromMemory = {history : []};
    // }
    // // }
    // console.log(objectTransactionsFromMemory);
    // // console.log('3 ', this.state);
    // incomingTransaction.key = this.obtainIdToUseForIncomingTransaction();
    // objectTransactionsFromMemory.history.push(incomingTransaction);
    //
    //
    // // this.setState({
    // //   id: this.state.id + 1
    // // });
    //
    // let toHistory = JSON.stringify({"history" : objectTransactionsFromMemory.history});
    // localStorage.setItem("memory", toHistory);
  }

  updateHistory(lastUsedId, incomingTransaction){
      let objectTransactionsFromMemory = this.fetchTransactionsFromMemory();

      if (!objectTransactionsFromMemory) {
          objectTransactionsFromMemory = {history : []};
      }
      console.log(objectTransactionsFromMemory);
      incomingTransaction.key = this.obtainIdToUseForIncomingTransaction();
      objectTransactionsFromMemory.history.push(incomingTransaction);
      let toHistory = JSON.stringify({"history" : objectTransactionsFromMemory.history});
      localStorage.setItem("memory", toHistory);
  }


  render(){

    console.log('state ', this.state.transactionHistory);
    console.log('localStorage', this.fetchTransactionsFromMemory());

    const transactionsFromMemory = this.fetchTransactionsFromMemory();

    let workingTransactionHistory;
    let outputTransactionHistory;

    if(transactionsFromMemory){
        workingTransactionHistory = [].concat(transactionsFromMemory.history);
        workingTransactionHistory.sort(function(a,b){
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        console.log(workingTransactionHistory);

        outputTransactionHistory = workingTransactionHistory.map(function(item){
            return <Transaction description={item.description} date={item.date} amount={item.amount} type={item.type} key={item.key}/>;
        });
};

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
