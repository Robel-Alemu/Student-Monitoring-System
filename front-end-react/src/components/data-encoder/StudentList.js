import Layout from "../layout/Layout";


import UpdateStudent from "./UpdateStudent";
function StudentList(props) {
    return (
        <div>{props.student.map(student =>
            <UpdateStudent
                key={student[0].id}
                studentId = {student[0].studentId}
                firstName={student[0].firstName}
                lastName={student[0].lastName}
                grade={student[0].grade} 
                section={student[0].section}
                parent1N={student[1].parentName}
                parent1P={student[1].parentPhone}
                parent2N={student[2].parentName}
                parent2P={student[2].parentPhone}
                field = {student[0].field}
                
                
            />
        )}</div>
       
            
       
    );
}

export default StudentList;