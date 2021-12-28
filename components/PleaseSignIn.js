import { useUser } from "./User";
import SignIn from "./SignIn";

export default function PleaseSignIn ( {children}){
    const Me = useUser();
    if(!Me){
        return <SignIn />
    }
    return children;

}