import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
    //This is our custom state provider! We will store data(state) and function(updaters)
    //here and anyone can access it via the consumer!

    const[cartOpen, setCartOpen] = useState(false);
   
    function toggleCart(){
        setCartOpen(!cartOpen);
    }

    function closeCart(){
       // alert("Hello world123");
        setCartOpen(false) ;
    }

    function openCart(){
        setCartOpen(true) ;
    }

    return(
        <LocalStateProvider 
        value=
        {{
        cartOpen , 
        setCartOpen,
        toggleCart,
        openCart,
        closeCart        
        }}>{children}</LocalStateProvider>
    );
}

//create a hook to access the value of cart local state
function useCart(){
//We use a consumer here to access the local state
const all = useContext(LocalStateContext);
return all;
}

export { CartStateProvider , useCart } ;