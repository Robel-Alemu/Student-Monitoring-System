import EditGrade from "./EditGrade";



function StudentGrade(props) {
    return (
        <div>{props.student.map(student =>
            <EditGrade
                key={student.id}
                studentId = {student.studentId}
                studentName={student.studentName}
                term={student.term}
                grade={student.grade} 
                section={student.section}
                subject = {student.subject}
                firstTest={student.firstTest}
                secondTest={student.secondTest}
                assessements={student.assessements}
                final={student.final}
                
                
            />
        )}</div>
       
            
       
    );
}

export default StudentGrade;