import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "../styles/ErrorStyles";
import Form from "../styles/Form";

const SINGLE_PRODUCT_QUERY = gql`
query SINGLE_PRODUCT_QUERY ($id: ID!){
    product(where: { id: $id}) {
        id
        name
        price
        description
    }
}
`;

const UPDATE_PRODUCT_MUTATION = gql`
mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
){
    updateProduct(where: {id: $id}        
        data: 
        { 
            name: $name, 
            description: $description, 
            price: $price 
        }
    ){
        id
        name
        description
        price
    }
}
`;

export default function UpdateProduct({ id }) {

const { data, error, loading} = useQuery(SINGLE_PRODUCT_QUERY , {
    variables :
    {
        id,
    } 
})
console.log(data);
//if (loading) return <p>Loading.....</p> 

const[updateProduct, 
    { data: updateData, error: updateError, loading: updateLoading},
] =  useMutation(
        UPDATE_PRODUCT_MUTATION, {
            variables: {
                id,
            }
        })

    const { inputs , handleChange , resetForm , clearForm} = useForm(data?.Product);

  return(
    <Form  onSubmit={async (e) => { 
    e.preventDefault();        
    const res = await updateProduct( {
        variables: {
                id,
                name: inputs.name,
                description: inputs.description,
                price: inputs.price
        }, 
    });
    
    }}>

        <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>

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

        <button type="submit">Update Product</button>
        
     </fieldset>   
    </Form>
);
}