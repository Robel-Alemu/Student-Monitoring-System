import React, { useState } from "react"
import Login from "../authentication/Login";

import DataEncoderLayout from "../layout/DataEncoderLayout"
import AllStudentsPage from "../pages/AllStudentsPage"


export default function DataEncoderDashboard() {

  let userRole = localStorage.getItem('role')
  if(userRole == "Data Encoder"){
    return (
  
      <DataEncoderLayout>
  
  <div>Data Encoder</div>
      </DataEncoderLayout>
      
  
  
    );
  }
  else {
    return(
      <Login/>
    );
  }
  
}
