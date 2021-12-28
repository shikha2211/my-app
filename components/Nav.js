import Link from 'next/link';
import { useCart } from '../lib/cartState';
import NavStyles from '../styles/NavStyles';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { useUser } from './User';
export default function Nav() {
    const user = useUser();
    const {openCart} = useCart();

    return(
        <NavStyles>            
            <Link href='/products'>Products</Link>
            {
                user && (
            <>
                <Link href='/sell'>Sell</Link>            
                <Link href='/orders'>Orders</Link>
                <Link href='/accounts'>Account</Link>          
                <SignOut />       
                <button onClick={openCart}>My Cart
                <CartCount count = {user.cart.reduce(
                    (tally,cartItem) => tally + cartItem.quantity, 0
                    )               
                }                
                />
                </button>
            </>
           )
        }
        {
            !user && (
                <>
                    <Link href='/signin'>Sign In</Link>  
                </>
            )
        }                
        </NavStyles>
    );
}