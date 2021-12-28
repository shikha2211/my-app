import styled from "styled-components";
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import { useState } from "react";
import nProgress from "nprogress";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/dist/client/router";
import { useCart } from "../lib/cartState";
import { CURRENT_USER_QUERY } from "./User";

const CheckoutFormStyles=styled.form`
box-shadow: 0 1px 2px 2px rgba(0 , 0 , 0 , 0.04);
border: 1px solid rgba(0 , 0 , 0 , 0.06);
border-radius: 5px;
padding: 1rem;
display: grid;
grid-gap: 1rem ;
`;

const CheckoutButton = styled.button`
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
        padding: 0.5rem 1.2rem;
`;

const CREATE_ORDER_MUTATION = gql`
mutation CREATE_ORDER_MUTATION($token: String!){
    checkout(token:$token){
        id
        charge
        total
        items{
            id
            name
        }
    }
}
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_ANALYTICS);

//console.log(stripeLib);

function CheckoutForm(){ 
    const[error, setError] = useState();
    const[loading,setLoading] = useState(false);
    const stripe= useStripe();
    const elements = useElements();
    const router = useRouter();
    const {closeCart} = useCart();
    const[checkout,{error:graphQLError}] = useMutation(
        CREATE_ORDER_MUTATION,
        { refetchQueries: [{query: CURRENT_USER_QUERY}]  }        
        );

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        nProgress.start();
       const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })
        console.log(paymentMethod);
        if(error){
            setError(error)
            nProgress.done();
            return; //stops the checkout from happening
        }

        //sends the token to our keystone server via a custom mutation
        const order = await checkout({
            variables:{
                token: paymentMethod.id,
            },
        });

        console.log("Finished with the order!!");
        console.log(order);

        //Change the page to view the order
        router.push({
            pathname: '/order',
            query:{id:order.data.checkout.id}
        });

        //Close the cart
        closeCart();

        //turn the loader off
        setLoading(false);
        nProgress.done();
    }

        return(
                <CheckoutFormStyles onSubmit={handleSubmit}>
                    {error && <p style={{fontSize:12,color:'red'}}>{error.message}</p>}
                    {graphQLError && <p style={{fontSize:12,color:'red'}}>{graphQLError.message}</p>}
                <CardElement />
                <CheckoutButton>Check out now </CheckoutButton>
            </CheckoutFormStyles>    
        );

    }

function Checkout(){
    return(
        <Elements stripe={stripeLib}>
            <CheckoutForm />           
        </Elements>
    );
}

export default Checkout ;