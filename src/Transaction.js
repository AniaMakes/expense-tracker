import React from "react";

class Transaction extends React.Component{
  constructor(){
    super();


}

  render(){

    const {description, date, amount, type} = this.props;

    return(
      <div className="transaction">
        <p>{description}</p>
        <p>{date}</p>
        <p>{amount}</p>
        <p>{type}</p>
      </div>
    );

  }
}

export default Transaction;
