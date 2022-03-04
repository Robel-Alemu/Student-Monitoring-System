import Layout from "../layout/Layout";
import Login from "../authentication/Login";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import UpdateProfile from "../admin/UpdateProfile";
import LayoutCenter from "../layout/LayoutCenter";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";

function UpdateProfilePage(){
    
    let userRole = localStorage.getItem("role")

if (userRole == "Admin"){
        return(
            <LayoutCenter>
                <UpdateProfile/>
            </LayoutCenter>
        )
    }
if (userRole == "Data Encoder"){
        return(
            <DataEncoderCenterLayout>
                <UpdateProfile/>
            </DataEncoderCenterLayout>
        )
    }
    else {
        return(
            <Login/>
        )
    }

    
}

export default UpdateProfilePage