import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from '../styles/ErrorStyles';
//import Product from './Product';
import Head from "next/head";
import styled from 'styled-components';

const ProductStyles = styled.div`
display: grid;
grid-auto-columns: 1fr;
grid-auto-flow: column;
min-height: 800px;
max-width: var(--maxWidth);
justify-content: center;
align-items: top;
gap: 2rem;

img{
    width: 100%;
    object-fit: contain;
}
`;

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!)  {
  product(where: { id: $id })
  {
    name
    price
    description
    id
    photo{
      altText
      image{
        publicUrlTransformed
      }      
    }
    }
}
`;

export default function SingleProduct( { id }){
    //console.log("ID: " + {id});
    const {data,loading,error} = useQuery(SINGLE_ITEM_QUERY,
        {
            variables: {
                id,
                //id_rec ,
            },
        });

    if(loading) return <p>Loading...</p>
    if(error) return <DisplayError error={error} />
    
    return(
        <ProductStyles>
            <Head>
                <title>Fruits 'n' Veggies | {data?.product?.name}</title>
            </Head>
            <img 
            src = {data?.product?.photo?.image?.publicUrlTransformed} 
            alt= {data.product.name} />
            <div className = "details">
                <h2>{data.product.name}</h2>             
                <p>{data.product.description}</p>
            </div>
        </ProductStyles>
    )

}