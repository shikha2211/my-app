import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "../styles/ErrorStyles";
import Form from "../styles/Form";
import { CURRENT_USER_QUERY } from "./User";

export default function SignIn(){

    const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String! , $password: String!){
        authenticateUserWithPassword(email: $email , password: $password){
            ... on UserAuthenticationWithPasswordSuccess {
            item {
                id
                name
                email
            }
        }

    }

}
    
`;
    const { inputs , handleChange , resetForm} = useForm ({
        email: '',
        password: '',
    })

    const [signin, {data , error, loading}] = useMutation(SIGNIN_MUTATION , {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY}]
    })

    //if(loading) return <p>Loading...</p>
    //if(error) return <DisplayError error={error} />

     async function handleSubmit(e){
        e.preventDefault(); //stop the form from submitting
        console.log(inputs);
        //const res = await signin().catch(console.error("Authentication failed"));
        const res= await signin();
        console.log(res);
        resetForm();
    }

    return(
        <Form method="POST" onSubmit={handleSubmit}>
         <DisplayError error={error} /> 
            <fieldset>
                <h2>Sign in to your account</h2>
            <label htmlFor="email">
             Email
            <input type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value = {inputs.email}
            onChange = {handleChange} />
            </label>

            <label htmlFor="password">
            Password
            <input type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password" 
            value ={inputs.password}
            onChange = {handleChange} />
            </label>    

            <button type ="submit">Sign In!</button>
            </fieldset>
        </Form>
    );
}