import Layout from "../layout/Layout";
import Students from "./Students";


// function StudentList(props) {
//     return (
//         <div>{props.students.map(student =>
//             <EditGrade
//                 key={student.id}
//                 studentId = {student.studentId}
//                 studentName={student.studentName}
//                 term={student.term}
//                 grade={student.grade} 
//                 section={student.section}
//                 firstTest={student.firstTest}
//                 secondTest={student.secondTest}
//                 assessements={student.assessements}
//                 final={student.final}
                
                
//             />
//         )}</div>
       
            
       
//     );
// }



function GradesList(props){
    const DisplayData=props.students.map(
        (info)=>{
            return(
                <tr>
            
              <td>{info.studentId}</td>
              <td>{info.studentName}</td>
              <td>{info.term}</td>
              <td>{info.grade}</td>
              <td>{info.section}</td>
              <td>{info.firstTest}</td>
              <td>{info.secondTest}</td>
              <td>{info.assessements}</td>
              <td>{info.final}</td>
              
              
              
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
              <th>Term</th>
              <th>Grade</th>
              <th>Section</th>
              <th>First Test</th>
              <th>Second Test</th>
              
              <th>Assessements</th>
              <th>Final</th>

                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 


export default GradesList;