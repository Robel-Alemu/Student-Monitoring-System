

import React from "react";
import SignUp from "./components/authentication/SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/authentication/Login";
import PrivateRoute from "./routes/PrivateRoute";
//import ForgotPassword from "./ForgotPassword"

import AddUser from "./components/admin/AddUser";
import SignupPage from "./components/pages/SignupPage";

import AddStudentPage from "./components/pages/AddStudentPage";
import { useAuth } from "./AuthContext/AuthContext";
import AddBroadcastPage from "./components/pages/AddBroadcastPage";
import AllStudentsPage from "./components/pages/AllStudentsPage";
import AllStudentList from "./components/admin/AllStudentList";
import EditBroadcastMessage from "./components/admin/EditBroadcastMessage";
import DataEncoderNavigation from "./components/data-encoder/DataEncoderNavigation";
import DataEncoderDashboard from "./components/data-encoder/DataEncoderDashboard";
import DataEncoderUpdatePassword from "./components/data-encoder/DataEncoderUpdatePassword";
import UpdateStudent from "./components/data-encoder/UpdateStudent";
import UpdateStudentPage from "./components/pages/UpdateStudentPage";
import AddNewUserPage from "./components/pages/AddNewUserPage";
import EditStudentPage from "./components/pages/EditStudentPage";
import AllUsersPage from "./components/pages/AllUsersPage";
import PrivateRouteRoleCheck from "./routes/PrivateRouteRoleCheck";
import AddGrade from "./components/data-encoder/AddGrade";
import AddAttendance from "./components/data-encoder/AddAttendance";
import UpdateGrade from "./components/data-encoder/UpdateGrade";
import UpdateAttendancePage from "./components/pages/UpdateAttendancePage";
import UpdateAttendance from "./components/data-encoder/UpdateAttendance";
import ViewGradePage from "./components/pages/ViewGrades";
import StudentList from "./components/admin/StudentList";
import GradesList from "./components/admin/GradesList";
import ViewAttendancePage from "./components/pages/ViewAttendance";
import AddMultipleStudents from "./components/data-encoder/AddMultipleStudents";
import AddStudent from "./components/data-encoder/AddStudent";
import AddClass from "./components/admin/AddClass";
import UpdateClass from "./components/admin/UpdateClass";
import SearchGradePage from "./components/pages/SearchGradePage";
import SendMessage from "./components/admin/SendMessage";
import AllBroadcastMessagesPage from "./components/pages/AllBroadcastMessagesPage";
import ViewAttendance from "./components/pages/ViewAttendanceCommon";
import UpdateProfilePage from "./components/pages/UpdateProfilePage";
import ViewGrades from "./components/pages/ViewGradesCommon";
import ViewMessages from "./components/admin/ViewMessages";

function App() {
  
    return (
      <Container
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ maxWidth: "100%" }}
      >
        <div className="w-100" style={{ height: "100%" }}>
          <Router>
            <AuthProvider>
              <Switch>
              

                
                <PrivateRoute path="/view-attendance">
                  <ViewAttendance  />
                </PrivateRoute>
                <PrivateRoute  path="/admin">
                  <AllBroadcastMessagesPage title={"Admin"} />
                </PrivateRoute>

                <PrivateRoute exact path="/">
            
                  <Login  />
                </PrivateRoute>
                <PrivateRoute exact path="/messages">
                  <ViewMessages />
                </PrivateRoute>
                <PrivateRoute path="/data-encoder">
                  <DataEncoderDashboard />
                  </PrivateRoute>
                  <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfilePage}
                />
                 <PrivateRoute path="/add-user" component={AddUser} />
                 <PrivateRoute path="/users" component={AllUsersPage} />
                 <PrivateRoute path="/add-class" component={AddClass} />
                 <PrivateRoute path="/update-class" component={UpdateClass} />
                 <PrivateRoute path="/add-student" component={AddStudent} />
                 <PrivateRoute path="/add-multiple-students" component={AddMultipleStudents} />
                 <PrivateRoute path="/send-message" component={SendMessage} />
                 <PrivateRoute
                  path="/broadcast-message"
                  component={AddBroadcastPage}
                />
                <PrivateRoute
                  path="/edit-broadcast-message"
                  component={EditBroadcastMessage}
                />
                 <PrivateRoute path="/edit-grades" component={SearchGradePage} />
                <PrivateRoute
                  path="/update-student"
                  component={EditStudentPage}
                />
                <PrivateRoute
                              path="/update-attendance"
                              component={UpdateAttendancePage}
                            />
                <PrivateRoute path="/add-grade" component={AddGrade} />  
                <PrivateRoute path="/update-grade" component={UpdateGrade} />
                <PrivateRoute
                  path="/add-attendance"
                  component={AddAttendance}
                />
                <PrivateRoute path="/view-grades">
                  <ViewGrades/>
                </PrivateRoute>
                <Route path="/login" component={Login} />
{/* ************************************************************************* */}
                
               
              <PrivateRoute
                  path="/update-profile-d"
                  component={DataEncoderUpdatePassword}
                />
                {/* <PrivateRoute path="/add-user" component={AddNewUserPage} /> */}
               
                
                 <PrivateRoute path="/all-students" component={AllStudentList} />
                
               
                {/* <PrivateRoute
                  path="/update-student"
                  component={UpdateStudent}
                /> */}
                <Route path="/signup" component={SignupPage} />
              
                <PrivateRoute
                  path="/update-attendance"
                  component={UpdateAttendance}
                />
          
                
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    );
  
}

export default App;
