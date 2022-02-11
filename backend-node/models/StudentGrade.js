class StudentGrade {
    constructor(id,studentId,studentName, grade, section,subject,firstTest,secondTest,assessements,final,term) {
      this.id=id;
      this.studentId = studentId;
      this.studentName = studentName;
      this.grade = grade;
      this.section = section;
      this.subject = subject;
      
      this.firstTest=firstTest;
      this.secondTest=secondTest;
      this.assessements=assessements;
      this.final=final;
      
      this.term = term;
      
     
     
    }
  }
  
  module.exports = StudentGrade;
  