import React from 'react';

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}


class ListExample extends React.Component {

    render() {
    const numbers = [1, 2, 3, 4, 5];
    //const doubled = numbers.map((number) => number * 2);
    /*const listItems = numbers.map((number) => (
      <li key={number.toString()}>
        {number * 2}
      </li>
    ));*/
    const listItems = numbers.map((number) => (
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number*2}  />
  ));
    //return <div>{alert(doubled)}</div>;
    return <ul>{listItems}</ul>;
  }
}

export default ListExample;