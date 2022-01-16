// import AddUser from "./components/admin/AddUser";
// import Layout from "./components/layout/Layout";
// import AddNewUserPage from "./components/pages/AddNewUserPage";
// import LogInPage from "./components/pages/LogInPage";
// import React, { useState, useEffect } from "react";
// import app from "./firebase";

// function App() {
//   const [user, setUser] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const clearInputs = () => {
//     setEmail("");
//     setPassword("");
//   };
//   const handleLogin = () => {
//     app
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch((err) => {
//         console.log(err);
//       });

   
//     };
//     const authListener = () => {
//       app.auth().onAuthStateChanged((user) => {
//         if (user) {
//           clearInputs();
//           setUser(user);
//         } else {
//           setUser("");
//         }
//       });
//     };
//     useEffect(() => {
//       authListener();
//     }, []);
//  let x = 5;

//  if (x<0)
//  return(
//   <div className="App">
//       <Layout>
//             <AddNewUserPage />
//           </Layout>
//     </div>
//  );
// else{

//     return (
//       <div className="App">
//         { 
//         user ? (
//           <Layout>
//             <AddNewUserPage />
//           </Layout>
//         ) : (
//           <Layout>
//             <h1>LogIn</h1><LogInPage
//           email={email}
//           setEmail={setEmail}
//           password={password}
//           setPassword={setPassword}
//           handleLogin={handleLogin}
//         /></Layout> 
//         )}
//       </div>
//     );
//         }
// };

// export default App;




import React from "react"
import SignUp from "./components/authentication/SignUp"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./AuthContext/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./components/admin/Dashboard"
import Login from "./components/authentication/Login"
import PrivateRoute from "./routes/PrivateRoute"
//import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./components/admin/UpdateProfile"
import AddUser from "./components/admin/AddUser"
import SignupPage from "./components/pages/SignupPage"

import AddStudentPage from "./components/pages/AddStudentPage";
import { useAuth } from "./AuthContext/AuthContext"
import AddBroadcastPage from "./components/pages/AddBroadcastPage"
import AllStudentsPage from "./components/pages/AllStudentsPage"
import AllStudentList from "./components/admin/AllStudentList"
import EditBroadcastMessage from "./components/admin/EditBroadcastMessage"
import DataEncoderNavigation from "./components/data-encoder/DataEncoderNavigation"
import DataEncoderDashboard from "./components/data-encoder/DataEncoderDashboard"
import DataEncoderUpdatePassword from "./components/data-encoder/DataEncoderUpdatePassword"
import UpdateStudent from "./components/data-encoder/UpdateStudent"
import UpdateStudentPage from "./components/pages/UpdateStudentPage"
import AddNewUserPage from "./components/pages/AddNewUserPage"
import EditStudentPage from "./components/pages/EditStudentPage"
import AllUsersPage from "./components/pages/AllUsersPage"
function App() {


  let x =4;

  if (x<0){
    return (
      <Container
      className="d-flex align-items-center justify-content-center"
    style={ {minHeight: "40vh", height: "80%"}}
   
    >
      {/* <div className="w-100" style={{ maxHeight: "400px" }}> 
      <Router><AuthProvider><SignUp /></AuthProvider></Router> */}
       <Router>
          <AuthProvider>
            <Switch>
            <PrivateRoute exact path="/data-encoder" component={DataEncoderDashboard} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/update-profile-d" component={DataEncoderUpdatePassword} />
              <PrivateRoute path="/add-user" component={AddNewUserPage} />
              <PrivateRoute path ="/add-student" component={AddStudentPage}/>
              <PrivateRoute path ="/broadcast-message" component={AddBroadcastPage}/>
              <PrivateRoute path ="/all-students" component={AllStudentsPage}/>
              <PrivateRoute path ="/update-student" component={EditStudentPage}/>
              {/* <PrivateRoute path ="/update-student" component={UpdateStudent}/> */}
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={Login} />
            
             
              
              

              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Switch>
          </AuthProvider>
        </Router>
      
    </Container>
    )
  }
  else {

  return (
    <Container className="w-100 d-flex align-items-center justify-content-center"
    style={{maxWidth:"100%" }}
    >
      <div className="w-100" style={{ height: "100%" }}> 
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/data-encoder" component={DataEncoderNavigation} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/update-profile-d" component={DataEncoderUpdatePassword} />
              <PrivateRoute path="/add-user" component={AddNewUserPage} />
              <PrivateRoute path="/users" component={AllUsersPage} />
              <PrivateRoute path ="/add-student" component={AddStudentPage}/>
              <PrivateRoute path ="/broadcast-message" component={AddBroadcastPage}/>
              <PrivateRoute path ="/edit-broadcast-message" component={EditBroadcastMessage}/>
              <PrivateRoute path ="/all-students" component={AllStudentList}/>
              <PrivateRoute path ="/update-student" component={EditStudentPage}/>
              {/* <PrivateRoute path ="/update-student" component={UpdateStudent}/> */}
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={Login} />
            
             
              
              

              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Switch>
          </AuthProvider>
        </Router>
      </div> 
    </Container>
  )
}
}


export default App
