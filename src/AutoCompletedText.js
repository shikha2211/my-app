import React from 'react';
import countries from './Countries';

 class AutoCompletedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  OnTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length >= 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = countries.sort().filter((v) => regex.test(v));
    }

    this.setState({ suggestions, text: value });

  };

  selectedText (value) {
      this.setState({ suggestions: [], text: value });

  }

  renderSuggestions = () => {
    let {suggestions} = this.state;
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>
        ))}
      </ul>
    );
  };

  render() {
    const { text } = this.state.text;
    //const {suggestions } = this.state.suggestions;
    return (
      <div id="notebooks">
        <h2>Auto Completed Text</h2>
        <input id="" type="text" onChange={this.OnTextChange} value={text} />
        {this.renderSuggestions()}
        {/* <span>Suggestions : {suggestions.length} </span> */}
      </div>
    );
  }
}

export default AutoCompletedText;