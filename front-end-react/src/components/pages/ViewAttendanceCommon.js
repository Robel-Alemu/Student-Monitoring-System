import ViewAttendancePage from "./ViewAttendance"
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import Login from "../authentication/Login";
import DataEncoderLayout from "../layout/DataEncoderLayout";

function ViewAttendance(){

    let userRole = localStorage.getItem("role")
    
    
    if (userRole == "Admin"){
        return(
            <Layout>
                <ViewAttendancePage/>
            </Layout>
        )
    }
    
    else if (userRole == "Data Encoder"){
        return(
            <DataEncoderLayout>
                <ViewAttendancePage/>
            </DataEncoderLayout>
        )
    }
    else {
        return(
            <Login/>
        )
    }


}

export default ViewAttendance;
