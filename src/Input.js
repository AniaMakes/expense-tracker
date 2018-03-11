import React from "react";

class Input extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      description: "",
      date: "",
      amount:0,
      type:"Other"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //fn bindings go here
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.transactionReceiver = this.state;

  }

  handleChange(event){
    let name = event.target.name;
    let content = event.target.value;

    this.setState({[name]: content});
  }

  render(){

    let buttonVisibility;

    if (this.state.description != "" && this.state.date != "" && this.state.amount !== 0){
      buttonVisibility = "visible";
    } else {
      buttonVisibility = "hidden";
    }


    return(
      <div>
        <form className="expense-input-form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.description}
            type="text"
            id="description"
            name="description"
          />
          <input
            onChange={this.handleChange}
            value={this.state.date}
            type="date"
            name="date"
            id="date"
          />
          <input
            onChange={this.handleChange}
            value={this.state.amount}
            type="number"
            name="amount"
            id="amount"
            step="0.01"
          />
          <select
            onChange={this.handleChange}
            value={this.state.type}
            name="type"
            id="type"
            type="">
              <option value="Not Specified">Other</option>
              <option value="Eating Out">Eating Out</option>
              <option value="Petrol">Petrol</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>

          </select>

          <button style={{visibility:buttonVisibility}} className="submit-btn" type="submit">Book transaction</button>
        </form>
      </div>
    );
  }
}

export default Input;
