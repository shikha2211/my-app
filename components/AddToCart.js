import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import CURRENT_USER_QUERY from "./User";

const ADD_TO_CART_MUTATION = gql`
mutation ADD_TO_CART_MUTATION($id: ID!){
    addToCart(productId : $id){
        id
    }
}
`;

console.log("Hello");

/* function add_to_cart(){
    cache.modify(cache.identify(payload.data.addToCart))
} */

export default function AddtoCart({ id }){
    const [addtoCart,{loading}] = useMutation(ADD_TO_CART_MUTATION,{
        variables: {id},
        refetchQueries: [{query: CURRENT_USER_QUERY}],
/*           add_to_cart,
          optimisticResponse:{
            addToCart:{
                __typename: 'CartItem',
                id,
            },
        }, */
   }
   );

    return (
    <button disabled={loading} type="button" onClick={addtoCart}> 
        Add{loading && "ing"} To Cart
        </button>
    );
}