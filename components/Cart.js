import styled from "styled-components";
import CartStyles from "../styles/CartStyles";
import { useUser } from "./User";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/cartState";
import RemovefromCart from "./RemovefromCart";
import Checkout from "./Checkout";

const CartItemStyles = styled.div`
padding: 1rem;
border-bottom: 1px solid var(--lightGrey);
display: grid;
grid-template-columns: auto 1fr auto;
img{
    margin-right: 1rem;
}
h3,p{
    margin: 0;
}
`;

function CartItem({ cartItem }){
    const { product } = cartItem;
    if(!product) return null;
    return (
        <CartItemStyles>
            <img 
             src={ product.photo.image.publicUrlTransformed } 
             alt={ product.name } 
             width="100" />
             <div>
                 <h3>{product.name}</h3>
                 <p>
                     {formatMoney( product.price * cartItem.quantity)} - 
                     <em>
                          &nbsp; {cartItem.quantity} &times; {formatMoney(product.price)} each
                     </em>
                 </p>
             </div>
             <RemovefromCart id={cartItem.id} />
        </CartItemStyles>    
    ); 
}

export default function Cart() {
    const me = useUser();
    const {cartOpen,closeCart} = useCart();
    //const data = useCart();
    //console.log({cartOpen});
    if(!me) return null;
    return (
          <CartStyles open = {cartOpen}>
         <header>{me.name}'s Cart&nbsp;
         <button type="button" onClick={closeCart}>&times;</button>
         </header>
         <ul>
             {me.cart.map((cartItem) => (
                 <CartItem key={cartItem.id} cartItem={cartItem} />
             ))}
         </ul>
         <footer>
             <p>{formatMoney(calcTotalPrice(me.cart))}</p>
             <Checkout />
         </footer>
         </CartStyles> 
    );    
}