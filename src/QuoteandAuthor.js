
import React from 'react';
import quotes from './QuotesDatabase';

class QuoteandAuthor extends React.Component{
    constructor(){
        super();
        this.state = {
          quote : quotes[0].quote,
          author : quotes[0].author

        };       
        
    }

GenerateQuote = () => {
    //alert('hi');
    const generateRandomQuote = this.randomQuote();
    this.setState({
        quote : generateRandomQuote.quote,
        author : generateRandomQuote.author
    });

     //alert(generateRandomQuote.quote);

} 

randomQuote(){
    const randomNumber = Math.floor(Math.random() * quotes.length);
    return quotes[randomNumber];
}

  randomColor() {
    const color = `rgb(
      ${Math.floor(Math.random() * 155)},
      ${Math.floor(Math.random() * 155)},
      ${Math.floor(Math.random() * 155)})`;
    return color;
  }

render(){

    const randomColor = this.randomColor();
    const html = document.documentElement;
    html.style.backgroundColor = randomColor;

    return (
      <div style={{ backgroundColor: "white" }} className="quotebox">
        <div
          className="fadeIn"
          key={Math.random()}
          style={{ color: randomColor }}
        >
          <h1 id="quote">"{this.state.quote}"</h1>
          <h5 id="author">
            -{this.state.author ? this.state.author : "Unknown"}-
          </h5>
        </div>
        <button
          style={{ backgroundColor: randomColor }}
          id="newquote"
          onClick={() => this.GenerateQuote()}
        >
          New quote
        </button>
      </div>
    );
    }
}

export default QuoteandAuthor;