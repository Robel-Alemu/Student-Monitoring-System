import Layout from "../layout/Layout";
import Students from "./Students";


// function StudentList(props) {
//     return (
//         <div>{props.students.map(student =>
//             <Students
//                 key={student.id}
//                 studentId = {student.studentId}
//                 firstName={student.firstName}
//                 lastName={student.lastName}
//                 grade={student.grade} 
//                 section={student.section}
//                 parent1N={student.parent1Name}
//                 parent1P={student.parent1Phone}
//                 parent2N={student.parent2Name}
//                 parent2P={student.parent2Phone}
                
                
//             />
//         )}</div>
       
            
       
//     );
// }



function StudentList(props){
    const DisplayData=props.students.map(
        (info)=>{
            return(
                <tr>
            
              <td>{info.studentId}</td>
              <td>{info.firstName}</td>
              <td>{info.lastName}</td>
              <td>{info.grade}</td>
              <td>{info.section}</td>
              <td>{info.parent1Name}</td>
              <td>{info.parent1Phone}</td>
              <td>{info.parent2Name}</td>
              <td>{info.parent2Phone}</td>
              <td>{info.field}</td>
              
              
              
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped">
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
              <th>Field</th>

                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 


export default StudentList;