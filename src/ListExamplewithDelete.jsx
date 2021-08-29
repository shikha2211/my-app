import React , {useState} from 'react';

const initialList = [
    {id : 'a' , name: 'Learn React'},
    {id: 'b' , name: 'Learn GraphQL'},
    {id: 'c' , name: 'Learn Firebase'}
];



const ListWithRemoveItem = () =>{

const [list, setlist] = useState(initialList);

const handleClick = id => {
    setlist(list.filter(item => item.id !== id));
};


    return(
        <ul>
            {list.map(item => (
             <li key = {item.id}>   
             <label>{item.name}</label>
             <button onClick={() => handleClick(item.id)} type='button'>Remove</button>
             </li>
            ) )
            }
        </ul>
    );

}

export default ListWithRemoveItem;

