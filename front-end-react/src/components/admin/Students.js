import { Card, Button ,Table } from "react-bootstrap";

function Students(props) {
  return (
   
    
    
       <Card>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th>parent1 Name</th>
              <th>Parent1 Phone</th>
              <th>Parent2 Name</th>
              <th>Parent2 Phone</th>
            
            </tr>
          </thead>
          
          <tbody>
          {/* <li style={{ listStyle: "none" }}> */}
            <tr>
              <td>{props.studentId}</td>
              <td>{props.firstName}</td>
              <td>{props.lastName}</td>
              <td>{props.grade}</td>
              <td>{props.section}</td>
              <td>{props.parent1N}</td>
              <td>{props.parent1P}</td>
              <td>{props.parent2N}</td>
              <td>{props.parent2P}</td>
              
              
              
            </tr>
            {/* </li> */}
          </tbody>
          
        </Table>
 </Card>
       
    
  );
}

export default Students;
