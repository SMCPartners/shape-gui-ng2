export class CreateUser {

  id: string;
  role: string;
  password?: string;
  newPassword?: string;
  organizationId: number;
  firstName: string;
  lastName: string;
  email: string;
  questionOne?: string;
  questionTwo?: string;
  answerOne?: string;
  answerTwo?: string;


  constructor(id: string, role: string, password: string, newPassword: string, organizationId: number, firstName: string, lastName: string, email: string, questionOne: string, questionTwo: string, answerOne: string, answerTwo: string) {
    this.id = id;
    this.role = role;
    this.password = password;
    this.newPassword = newPassword;
    this.organizationId = organizationId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.questionOne = questionOne;
    this.questionTwo = questionTwo;
    this.answerOne = answerOne;
    this.answerTwo = answerTwo;
  }
}
