class StudentAttendance {
  constructor(id, studentId, studentName,  grade, section, status, date) {
    this.id = id;
    this.studentId = studentId;
    this.studentName = studentName;
    // this.year = year;
    // this.term = term;
    this.grade = grade;
    this.section = section;
    this.status = status;
    this.date = date;
  }
}

module.exports = StudentAttendance;
