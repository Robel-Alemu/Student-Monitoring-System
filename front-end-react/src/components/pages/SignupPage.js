
import { useHistory } from "react-router-dom";
import Signup from "../authentication/SignUp";
function SignupPage() {
  const history = useHistory();
  function signupHandler(userData) {
    fetch(
      "http://localhost:8080/api/Users",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then(() => {
      history.push("/");
     });
     
    }
  return (
   
      <Signup onSignup={signupHandler}  />
  
  );
}


export default SignupPage;
