import React from 'react';

const h1Style ={
    color:'yellow'
};

function Hello(props){
    return <h1 style={h1Style}>props.msg</h1>

}

const Hello_Comp = <Hello msg = 'Welcome to the world of React !' />

export default Hello_Comp;