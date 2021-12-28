import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "../styles/ErrorStyles";
import Form from "../styles/Form";

export default function SignUp(){

    const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        sendUserPasswordResetLink(email: $email)
}    
`;
   
    const { inputs , handleChange , resetForm} = useForm ({
        email: ''
    })

    const [requestreset, {data , error, loading}] = useMutation(REQUEST_RESET_MUTATION , {
        variables: inputs,
    })
    
     async function handleSubmit(e){
        e.preventDefault(); //stop the form from submitting
        //console.log(inputs);
        const res = await requestreset();
        // console.log(res);
        // console.log({data , error , loading});
        resetForm();
    }

    return(
        <Form method="POST" onSubmit={handleSubmit}> 
        <DisplayError error={error} /> 
            <fieldset>
                {data?.sendUserPasswordResetLink === true && (
                    <p>Success! Check your email for a link!</p>
                )}
            <h2>Request Reset Password</h2>
            
            <label htmlFor="email">
             Email
            <input type="text"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value = {inputs.email}
            onChange = {handleChange} />
            </label>

            <button type ="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
}