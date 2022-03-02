import Layout from "../layout/Layout";


import UpdateStudent from "./UpdateStudent";
function StudentList(props) {
    return (
        <div>{props.student.map(student =>
            <UpdateStudent
                key={student.id}
                studentId = {student.studentId}
                firstName={student.firstName}
                lastName={student.lastName}
                grade={student.grade} 
                section={student.section}
                parent1N={student.parentPhones[0]}
                parent1P={student.parentPhones[1]}
                parent2N={student.parent2Name}
                parent2P={student.parent2Phone}
                field = {student.field}
                
                
            />
        )}</div>
       
            
       
    );
}

export default StudentList;