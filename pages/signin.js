import styled from "styled-components";
import SignIn from "../components/signin";
import SignUp from "../components/SignUp";
import RequestReset from "../components/RequestReset"

const GridStyles = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(265px,1fr) );
grid-gap: 2rem;
`;

export default function SignInPage(){
    return (
         <GridStyles>
            <SignIn />
            <SignUp />
            <RequestReset />
        </GridStyles>
        
    );
}   

