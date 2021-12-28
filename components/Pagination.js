import PaginationStyles from "../styles/PaginationStyles";
import Head from 'next/head';
import Link from 'next/link';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "../styles/ErrorStyles";
import {perPage} from '../config';

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        productsCount
}
`;

export default function Pagination({ page }) {

    //console.log("In Pagination.js");

    const { error , loading , data } = useQuery(PAGINATION_QUERY);

    if(loading) return 'Loading....'
    if(error) return <DisplayError error={error} />
  
    const count = data.productsCount ;
    //console.log(count);
    const pageCount = Math.ceil(count / perPage);    
    //console.log(pageCount);

    return(
        <PaginationStyles>
            <Head>
                <title>Fruits 'n' Veggies - Page {page} of {pageCount}</title>
            </Head>
            
            <Link href={`/products/${page - 1}`}>
            <a aria-disabled={page <= 1} >Prev</a>
            </Link>
            
            <p>Page {page} of {pageCount}</p>            
            <p>{count} Items total</p>
            
            <Link href={`/products/${page + 1}`}>
            <a aria-disabled={page >= pageCount}>Next</a>
            </Link>            
        </PaginationStyles>
    );

}