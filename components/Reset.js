import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "../styles/ErrorStyles";
import Form from "../styles/Form";
import { CURRENT_USER_QUERY } from "./User";

export default function Reset( {token} ){

    const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!, $password: String!, $token: String!){
        redeemUserPasswordResetToken
        (
            email: $email, 
            password: $password, 
            token: $token,
        )
        {
            code
            message
        }
    }    
`;

   
    const { inputs , handleChange , resetForm} = useForm ({
        email: '' ,
        password: '',
        token: token,
    })

    const [reset, {data , loading, error}] = useMutation(RESET_MUTATION , {
        variables: inputs,
    });

    const isSuccessOrNotError = data?.redeemUserPasswordResetToken?.code 
                                ? data?.redeemUserPasswordResetToken 
                                : undefined;

     async function handleSubmit(e){
        e.preventDefault(); //stop the form from submitting
        const res = await reset().catch(console.error());
        resetForm();
    }

    return(
        <Form method="POST" onSubmit={handleSubmit}> 
        <DisplayError error={error || isSuccessOrNotError} /> 
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && (
                    <p>Success! You can now sign in</p>
                )}
            <h2>Reset Your Password</h2>
            
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

            <button type ="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
}