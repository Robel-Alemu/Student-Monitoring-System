import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase";
import axios from "axios"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState("");
   function signup(email, password) {
    
    return auth.createUserWithEmailAndPassword(email, password)
    // await firestore.collection("Users-new").doc().set({
    //   userId: user.uid,
    //   email : email,
    //  });
    // return user;
  }

  async function login(email, password) {
    // const result = await axios.get("http://localhost:8080/api/users/"+email);
    // if (result.data[0] === 'Account does not exist!'){
    //   console.log(result.data[0]);
    // }
    // else

    const userData = {
      email : email,
      password: password
    }

    fetch(
      "http://localhost:8080/api/login",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // if(data.token){
        //   setLoggedIn(true);
        //   console.log(loggedIn,"after success")
        //   // alert(data.token);
        //     console.log(data)
        //     // return data.user; 
        // }

        console.log(data.token)
        localStorage.setItem('token', data.token);
       
                         
        })
      
       
      

      

    return auth.signInWithEmailAndPassword(email, password)
  }

 async function getUser(email){

  try{
    const result = await axios.get("http://localhost:8080/api/users/"+email);
    return result.data[0];
    console.log(result)

  }catch (error){
    return null;
    console.log(error)
  }

  

  

    // fetch(
    //   "http://localhost:8080/api/users/"+email
    // )
    //   .then((response) => {
    //     // console.log(response);
    //     return response.json();
    //   })
    //   .then((data) => {


    //     for (const key in data) {
    //       const message = {
    //         id: key,
    //         ...data[key],
    //       };
    //     console.log(message.role);
        
    //     role = message.role;
    //     setRole(role);
    //   };



    //  } );
    //  return role;
  }


  async function getStudent(id){

    try{
      const result = await axios.get("http://localhost:8080/Student-Information/"+id);
      console.log(result.data);
      return result.data;
      
  
    }catch (error){
      return null;
      console.log(error)
    }
  }
  function logout() {
    localStorage.clear();

    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getUser,
    getStudent
    
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
