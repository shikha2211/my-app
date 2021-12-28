import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "../styles/ErrorStyles";
import Form from "../styles/Form";
import { CURRENT_USER_QUERY } from "./User";

export default function SignUp(){

    const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String! , $password: String!){
        createUser(
            data:
        {
            email: $email , name: $name , password: $password
        }
        )
        {
            id
            name
        }
}    
`;
   
    const { inputs , handleChange , resetForm} = useForm ({
        email: '',
        name: '',
        password: '',
    })

    const [signup, {data , error, loading}] = useMutation(SIGNUP_MUTATION , {
        variables: inputs,
    })

     async function handleSubmit(e){
        e.preventDefault(); //stop the form from submitting
        //console.log(inputs);
        const res = await signup();
        console.log(res);
        console.log({data , error , loading});
        resetForm();
    }

    return(
        <Form method="POST" onSubmit={handleSubmit}> 
        <DisplayError error={error} /> 
            <fieldset>
                {data?.createUser && (
                    <p>Signed up with {data.createUser.name} - Please go ahead and sign in!</p>
                )}
            <h2>Sign up for an account</h2>
            <label htmlFor="name">
             Name
            <input type="text"
            name="name"
            placeholder="Enter your name"
            autoComplete="name"
            value = {inputs.name}
            onChange = {handleChange} />
            </label>
            
            <label htmlFor="email">
             Email
            <input type="text"
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
            minLength="8"
            placeholder="Enter your password"
            autoComplete="password" 
            value ={inputs.password}
            onChange = {handleChange} />
            </label>    

            <button type ="submit">Sign Up!</button>
            </fieldset>
        </Form>
    );
}