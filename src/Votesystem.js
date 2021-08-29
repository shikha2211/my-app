import React from 'react';
import './App.css';

class Votesystem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            languages: [
                {name : 'PHP',votes :0},
                {name:'Python' , votes:0},
                {name:'GO',votes:0},
                {name:'React',votes:0}
            ]
        }

        //this.votes = this.votes.bind(this);

    }

    votes(i){
        let newlanguages = [...this.state.languages];
        newlanguages[i].votes ++ ;
        this.setState({languages : newlanguages});
    }

    render(){
        return (
          <>
            <h1>Vote your language</h1>

            <div className="languages">
              {this.state.languages.map((lang, i) => (
                <div key={i} className="language">
                  <label className="voteCount">{lang.votes}</label>&nbsp;&nbsp;
                  <label className="language">{lang.name}</label>
                  <button className="language" onClick={() => this.votes(i)}>
                    Click Here
                  </button>
                </div>
              ))}
            </div>
          </>
        );
            
    }
}

export default Votesystem;
