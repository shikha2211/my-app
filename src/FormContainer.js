import React from 'react';
import FormComponent from './FormComponent';

class App extends React.Component{

    constructor()
    {
        super();
        this.state={
            firstName : "",
            lastName : "",
            age : "",
            gender : "",
            destination : "",
            nutsFree : false,
            lactoseFree : false,
            isVegan : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const{value,name,type,checked} = e.target;

        type === "checkbox"
        ?this.setState ({[name] : checked}) : this.setState({[name] : value});

    }

    handleSubmit(){
        alert('hi');
        if (this.firstName === "" || this.lastName === "") {
            alert("Field required!");
        }
    }

    render(){
        return <FormComponent handleChange = {this.handleChange} {...this.state} />
    }
}


export default App;