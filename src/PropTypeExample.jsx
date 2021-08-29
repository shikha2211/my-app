import React from 'react';
//import PropTypes from 'prop-types';



/* class PropTypeExample extends React.Component{
render(){

    <div>
        <input type='text' />
    </div>
    return(
        <h1>Hello {this.props.name}</h1>
    );
}
}

PropTypeExample.PropTypes =  {
  name: PropTypes.string
};



 */

class PropTypeExample extends React.Component{

    constructor(props){
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input= React.createRef();
        }

    handleSubmit(event){
        alert('A value was submitted: ' + this.input.current.value);
        event.preventDefault();
    }

    render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <label>Name
        <input type="text" ref={this.input} />
        </label>
            <input type='Submit' value='Submit'/>
        </form>
    );
}

}



export default PropTypeExample;