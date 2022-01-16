import Layout from "../layout/Layout";
import Students from "./Students";


function StudentList(props) {
    return (
        <div>{props.students.map(student =>
            <Students
                key={student.id}
                studentId = {student.studentId}
                firstName={student.firstName}
                lastName={student.lastName}
                grade={student.grade} 
                section={student.section}
                parent1N={student.parent1Name}
                parent1P={student.parent1Phone}
                parent2N={student.parent2Name}
                parent2P={student.parent2Phone}
                
                
            />
        )}</div>
       
            
       
    );
}

export default StudentList;