import { useState } from "react";

const initialList=[
    {id: 'a' , name: 'Learn React' , complete : false},
    {id:'b' , name : 'Learn FireBase' , complete : false},
    {id:'c' , name : 'Learn Graph SQL', complete : false }
];

const ListWithUpdateItem = () => {

    const [list,setlist] = useState(initialList);

    const handleChangeCheckbox = id => {
        setlist (
            list.map(item => {
                if (item.id === id ){
                    return {...item , complete  : !item.complete } 
                }else{
                    return item ;
                }
            }
                )
        )

    };

    return (
        <ul>
            {list.map(item => (
                <li key={item.id}>
                <label>
                <input type='checkbox' checked={item.complete} 
                onChange={ () => handleChangeCheckbox(item.id)  } />   
                    {item.name}
                </label>
                </li>

            ))}
        </ul>
    );
};

 ListWithUpdateItem;