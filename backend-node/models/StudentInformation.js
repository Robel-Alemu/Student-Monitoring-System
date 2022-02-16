class StudentInformation {
    constructor(id,studentId,firstName,lastName, grade, section,field, parent1Name, parent1Phone,parent2Name, parent2Phone ) {
      this.id=id;
      this.studentId = studentId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.grade = grade;
      this.section = section;
      this.field = field;
      this.parent1Name = parent1Name;
      this.parent1Phone = parent1Phone;
      this.parent2Name = parent2Name;
      this.parent2Phone = parent2Phone;
    }
  }
  
  module.exports = StudentInformation;
  