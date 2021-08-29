import React from "react";

class EventTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.onTestClick = this.onTestClick.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onTestClick(event) {
      if (this.state.name.trim() === ''){
          alert('The name field is blank!');
          event.preventDefault();
      }
      else{
          alert("You have entered: " + this.state.name);
      }    
  }

  onUpdate(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <label>Enter your name: </label>       
        <input type="text" value={this.state.name} onChange={this.onUpdate} />
        <br /> 
        <h2>{this.state.name}</h2>
        <input type="button" value="Click me" onClick={this.onTestClick} />
      </div>
    );
  }
}

export default EventTest;
