import  {useState} from 'react';

const initialList = [
    "Learn React", 
    "Learn Firebase", 
    "Learn GraphQL"
];

const ListWithAddItem = () => {

    const[list,Setlist] = useState(initialList) ;
    const[value,Setvalue] = useState('');

    const handleSubmit = event =>{
        if (value){
            Setlist(list.concat(value));            
        }

        Setvalue('');
        event.preventDefault();
    };

    const handleChange = event =>{
        Setvalue(event.target.value)
    };

return(
<div>
    <ul>
        {list.map(item =>
        <li key={item}>{item}</li>
        )}
        </ul>
        <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={handleChange} />
        <button type='submit'>Add Item</button>
        </form>    
</div>
);
};

export default ListWithAddItem;