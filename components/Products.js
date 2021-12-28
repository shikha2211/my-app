import ItemStyles from "../styles/ItemStyles";
import PriceTag from "../styles/PriceTag";
import Title from "../styles/Title";
import Link from "next/link";
import formatMoney from "../lib/formatMoney"; 
import emoji from "markdown-it-emoji";
import DeleteProduct from "./DeleteProduct";
import AddtoCart from "./AddToCart";

export default function Products({product}) {
    //console.log("PID: " + product?.photo?.image?.publicUrlTransformed);
    return(
        <ItemStyles>
            <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
       <Title>
           <Link href={`/product/${product.id}`}>{product.name}</Link>
       </Title>
       <PriceTag>{formatMoney(product.price)}</PriceTag>
       <p>{product.description}</p>
       <div className='buttonList'>
           <Link href={{
               pathname: 'update',
               query: {
                   id: product.id
               }

           }}>Edit </Link>
           <AddtoCart id={product.id} />
           <DeleteProduct id = {product.id}>Delete</DeleteProduct>
       </div>
    </ItemStyles>
    );
   
}