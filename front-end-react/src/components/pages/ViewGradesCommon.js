import ViewGradePage from "./ViewGrades"
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import Login from "../authentication/Login";
import DataEncoderLayout from "../layout/DataEncoderLayout";

function ViewGrades(){

    let userRole = localStorage.getItem("role")
    
    
    if (userRole == "Admin"){
        return(
            <Layout>
                <ViewGradePage/>
            </Layout>
        )
    }
    
    else if (userRole == "Data Encoder"){
        return(
            <DataEncoderLayout>
                <ViewGradePage/>
            </DataEncoderLayout>
        )
    }
    else {
        return(
            <Login/>
        )
    }


}

export default ViewGrades;
