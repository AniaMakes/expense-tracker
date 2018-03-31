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
    this.forceUpdate(); // forceUpdate is used because data does NOT live in state, so component needs to be manually told to update, as we are updating and fetching from localStorage rather than state
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
