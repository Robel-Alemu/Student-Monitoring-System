
import MessageList from "./MessageList";

import { useState, useEffect } from "react";
import {Button,Spinner } from "react-bootstrap"
import LayoutCenter from "../layout/LayoutCenter";

import { useAuth } from "../../AuthContext/AuthContext";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import Login from "../authentication/Login";
import ParentMessageList from "./ParentMessageList";

function ViewMessages() {

 

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const token = localStorage.getItem("token")
  
  
     let userRole = localStorage.getItem("role");
     
 



  useEffect(() => {

     setIsLoading(true);
      
    //  fetch(
    
    //   // "https://student-monitoring.herokuapp.com
    //   "http://localhost:8080/api/users/"+email 
       
    // )
    //   .then((response) => {
        
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data[0].role)
    //     setUser(data[0].role)
      

        
    //   })

      fetch(
        "http://localhost:8080/api/view-messages",{
          method: "GET",
          
          headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
        }
        // "https://student-monitoring.herokuapp.com/api/broadcast-messages"
      )
        .then((response) => {
          console.log(response.body);
          return response.json();
        })
        .then((data) => {
          const messages = [];
  
          for (const key in data) {
            const message = {
              id: key,
              ...data[key],
            };
            messages.push(message);
          }
          setIsLoading(false);
          setLoadedMessages(messages);
        });
     
    
  },[]);

  if (isLoading) {
    if(userRole == "Admin"){
      return (
        <section>
          <Layout>
          <section>
        <div >
      
            
<h5 style={{color:"black"}}>Loading Please Wait...</h5>
<Spinner style={{color:"black"}} animation="border" />
        </div>
           
         
        </section>
          </Layout>
        </section>
      );
    }
    else{
      return (
        <section>
        
          
        <div >
      
        {/* style={{display: "flex" ,justifyContent: "center", alignItems: "center", height:"800px" ,opacity:"0.9"}}    */}
<h5 style={{color:"black"}}>Loading Please Wait...</h5>
<Spinner style={{color:"black"}} animation="border" />
        </div>
           
         
       
         
        </section>
      );
    }
     
    } 
  

  else if (userRole == "Admin") {
  return (
    <LayoutCenter><h1>Sent Messages</h1>

      
    <ParentMessageList  messages = {loadedMessages} /></LayoutCenter>
      

  
  );
  }

  else{
    return (
      <Login/>
    )
    
//     return (
      
//       <section>
//         <div style={{display: "flex" ,justifyContent: "center", alignItems: "center", height:"800px" ,opacity:"0.9"}}>
      
            
// <h5 style={{color:"black"}}>Loading Please Wait...</h5>
// <Spinner style={{color:"black"}} animation="border" />
//         </div>
           
         
//         </section>
//     );
    }


}

export default ViewMessages;
