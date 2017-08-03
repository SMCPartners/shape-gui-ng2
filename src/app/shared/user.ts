export class User {
  id: string;
  role: string;
  admin: boolean;
  createDt?: any;
  createdBy?: any;
  modifiedDt?: any;
  modifiedBy?: any;
  password?: any;
  active: boolean;
  resetPwd: boolean;
  organizationId: number;
  organizationName: string;
  firstName: string;
  lastName: string;
  email: string;
  questionOne: string;
  questionTwo: string;
  answerOne: string;
  answerTwo: string;
  userResetPwdChallenge: number;


  constructor(id: string, role: string, admin: boolean, createDt: any, createdBy: any, modifiedDt: any, modifiedBy: any, password: any, active: boolean, resetPwd: boolean, organizationId: number, organizationName: string, firstName: string, lastName: string, email: string, questionOne: string, questionTwo: string, answerOne: string, answerTwo: string, userResetPwdChallenge: number) {
    this.id = id;
    this.role = role;
    this.admin = admin;
    this.createDt = createDt;
    this.createdBy = createdBy;
    this.modifiedDt = modifiedDt;
    this.modifiedBy = modifiedBy;
    this.password = password;
    this.active = active;
    this.resetPwd = resetPwd;
    this.organizationId = organizationId;
    this.organizationName = organizationName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.questionOne = questionOne;
    this.questionTwo = questionTwo;
    this.answerOne = answerOne;
    this.answerTwo = answerTwo;
    this.userResetPwdChallenge = userResetPwdChallenge;
  }


  static convertToTableObject(userArray: User[]): any[] {

    const returnArray: any[] = [];

    userArray.forEach(user => {

      const statusButton = user.active == false ?
        `<button class="btn btn-danger" id="${user.id}" (click)="onClick[${user.id}]">Inactive</button>` :
          `<button class="btn btn-success" id="${user.id}" (click)="onClick[${user.id}]">Active</button>`;

      returnArray.push({
        id : user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        organization: user.organizationName,
        organizationId: user.organizationId,
        status: statusButton
        //status: user.active ? 'Active' : 'Inactive'
      })

    });

    return returnArray;
  }

  static convertTableObjectToDTO(tableObject: any) {
    const active = tableObject.status.includes('Active') ? true : false;
    return { id: tableObject.id, firstName: tableObject.firstName, lastName: tableObject.lastName,
             email: tableObject.email, role: tableObject.role, organizationId: tableObject.organizationId,
             active: active }
  }

}
