import useForm from "../lib/useForm";
import Form from "../styles/Form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from "../styles/ErrorStyles";
import { ALL_PRODUCTS_QUERY } from "./Product";
import Router from "next/router";

const CREATE_PRODUCT_MUTATION = gql`
mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!    
    $image: Upload

) {
  createProduct(
    data: {
    name: $name
    description: $description
    price: $price
    photo : {create : {image: $image , altText: $name }}
    status : "AVAILABLE"
  }
  ) 
  {
    id
    name
    price
    description
  }
}

`;

export default function CreateProduct() {
    const { inputs , handleChange , resetForm , clearForm} = useForm({

        image: '',
        name: 'Juicy Fruit',
        price: 250,
        description: 'It is a fresh and juicy fruit',
        
    });

    const [createProduct,{loading , error , data}] = useMutation(
        CREATE_PRODUCT_MUTATION,
        {
            variables : inputs,
            refetchQueries: [{
                query: ALL_PRODUCTS_QUERY,
                fetchPolicy:'network only',
            } ] ,
    
        }
    );

    console.log({createProduct});

    return(
        <Form onSubmit={async (e) => { 
        e.preventDefault();        

        const res = await createProduct();
        clearForm();
        
        //Go to the product's page

        Router.push({
            pathname: `/product/${res.data.createProduct.id}`,
        });

        }}>
            <DisplayError />
            <fieldset disabled={loading} aria-busy={loading}>

            <label htmlFor="image">
            Image
            <input required 
            id="image" 
            name="image"
            type="file"
            onChange={handleChange } />
            </label>

            <label htmlFor="name">
            Name
            <input id="name" 
            name ="name" 
            placeholder="Enter a name" 
            value={inputs.name} 
            onChange={handleChange } />
            </label>

            <label htmlFor="price">
            Price
            <input id="price" 
            type="number"
            name ="price" 
            placeholder="Enter a price" 
            value={inputs.price} 
            onChange={handleChange} />
            </label>

            <label htmlFor="description">
            Description
            <textarea id="description" 
            name ="description" 
            placeholder="Enter a description" 
            value={inputs.description} 
            onChange={handleChange} />
            </label>                  

            <button type="submit">+Add Product</button>
            
         </fieldset>   
        </Form>
    );
}
