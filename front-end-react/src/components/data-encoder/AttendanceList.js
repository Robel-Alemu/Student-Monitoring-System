import Layout from "../layout/Layout";


import UpdateAttendance from "./UpdateAttendance";
function AttendanceList(props) {
    return (
        <div>{props.attendance.map(attendance =>
            <UpdateAttendance
                key={attendance.id}
                studentId = {attendance.studentId}
                studentName={attendance.studentName}
                // year={attendance.year}
                // term={attendance.term}
                grade={attendance.grade} 
                section={attendance.section}
                status={attendance.status}
                date={attendance.date}
              
                
                
            />
        )}</div>
       
            
       
    );
}

export default AttendanceList;