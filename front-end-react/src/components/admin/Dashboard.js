import React, { useState } from "react"
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useAuth } from "../../AuthContext/AuthContext"
import { Link, useHistory } from "react-router-dom"
import AdminNavigation from "./AdminNavigation"
import Layout from "../layout/Layout"

import AddUser from "./AddUser";
import { AuthProvider } from "../../AuthContext/AuthContext";
import PrivateRoute from "../../routes/PrivateRoute";
import AllBroadcastMessagesPage from "../pages/AllBroadcastMessagesPage"
import LayoutCenter from "../layout/LayoutCenter"


export default function Dashboard({title}) {


  return (
    <LayoutCenter>
      <AllBroadcastMessagesPage />
        
        </LayoutCenter>
    


  );
}

