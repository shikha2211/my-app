import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import OrderItemStyles from "../styles/OrderItemStyles";
import Link from "next/link";
import Head from "next/head";

const ALL_ORDERS_QUERY = gql`
query ALL_ORDERS_QUERY{
    orders {
        id
        charge
        total
        user{
            id
        }
        items{
            id
            name
            description
            price
            quantity
            photo{
                image{
                    publicUrlTransformed
                }
            }
        }
    }
}
`;

const OrderUl = styled.ul`
display: grid;
grid-template-columns: repeat(auto-fit,minmax(350px, 1fr));
grid-gap: 4rem;

`;

function countItemsInanOrder(order){
    return order.items.reduce((tally,item) => tally + item.quantity , 0 ) ;
}

export default function OrdersPage(){
    const {data,error,loading} = useQuery(ALL_ORDERS_QUERY);
     if(loading) return <p>Loading....</p>
     if(error) return <p>{error}</p>
    //  const {order} = data;
      console.log(data);
     return (
        <div>
            <Head>
                <title>Your Orders - {data.orders.length}</title>
            </Head>
            <h2>You have {data.orders.length} orders!</h2>
            <OrderUl>
                {data.orders.map((order) =>
                <OrderItemStyles>
                    <Link href={`/order?id=${order.id}`}>
                        <a>
                        <div className="order-meta">
                            <p>{order.id}</p>
                            <p>{countItemsInanOrder(order)} Items</p>
                            <p>{order.items.length} Products
                            {order.items.length === 1 ? '' : 's'} 
                            </p>
                            <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                            {order.items.map(item => 
                            <img 
                            key={`image-${item.id}`} 
                            src = {item.photo?.image?.publicUrlTransformed}
                            alt={item.name}
                            />
                        )}                            
                        </div>
                        </a>
                    </Link>
                </OrderItemStyles>
                 )
                 }
            </OrderUl>
        </div>
     ); 
}