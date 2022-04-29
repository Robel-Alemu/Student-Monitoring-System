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



function AttendanceList(props){

    const DisplayData=props.students.map(
        (info)=>{
            return(
                <tr>
            
              <td>{info.studentId}</td>
              <td>{info.studentName}</td>
              {/* <td>{info.term}</td> */}
              <td>{info.grade}</td>
              <td>{info.section}</td>
              <td>{info.date}</td>
              <td style={{fontWeight: "bold"}}>{info.status}</td>
              
              
              
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
                   
              <th>Student Name</th>
              {/* <th>Term</th> */}
              <th>Grade</th>
              <th>Section</th>
              <th>Date</th>
              <th>Status</th>
             

                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 


export default AttendanceList;