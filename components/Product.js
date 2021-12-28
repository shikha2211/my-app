import gql from 'graphql-tag' ;
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Products from './Products';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $take: Int = 0) {
        products(take: $take , skip: $skip){
        id
        name
        description
        price
        photo{
            image{
            publicUrlTransformed
            }
        }
        }
    }
`;

const ProductListStyles = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 80px;

`;

export default function Product({ page }) {

    //console.log("skip : " + (page * perPage - perPage) + " first: " + perPage  );
    
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY,{
        variables:
        {
            skip: page * perPage - perPage,
            take: perPage
        }
    });

    //console.log(data , error , loading);

    if (loading) return <p> Loading..... </p>
    if (error) return <p> Error: {error.message} </p>
    return(
        <div>
            <ProductListStyles>
            {data.products.map((product) => 
                <Products key={product.id} product = {product} />
            )}
             </ProductListStyles>   
        </div>
    );
}
