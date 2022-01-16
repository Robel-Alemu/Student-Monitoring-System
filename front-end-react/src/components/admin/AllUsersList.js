import Layout from "../layout/Layout";

import Users from "./Users";


function AllUsersList(props) {
    return (
        <div>{props.users.map(user =>
            <Users
                key={user.id}
                userId={user.userId}
                name = {user.name}
                phone={user.phone}
                role={user.role}
                email={user.email} 
                
                
                
            />
        )}</div>
       
            
       
    );
}

export default AllUsersList;