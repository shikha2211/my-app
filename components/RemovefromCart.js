import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const BigButton= styled.button`
font-size: 3rem;
background: none;
border: 0;
&:hover{
    color: var(--red);
    cursor: pointer;
}
`;

const REMOVE_FROM_CART_MUTATION = gql`
mutation REMOVE_FROM_CART_MUTATION($id:ID!){
    deleteCartItem(where:{id : $id}) {
        id
    }
}
`;

function update(cache, payload){
    cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemovefromCart({ id }){
    const[removefromCart,{loading}] = useMutation(
        REMOVE_FROM_CART_MUTATION,
        {
            variables:  { id },        
            update,
            optimisticResponse:{
                deleteCartItem:{
                    __typename: 'CartItem',
                    id,
                },
            },
        });
    return(
        <BigButton 
        type="button" 
        disabled={loading}
        title="Remove this item from Cart"
        onClick={removefromCart}>&times;</BigButton>
    );
}