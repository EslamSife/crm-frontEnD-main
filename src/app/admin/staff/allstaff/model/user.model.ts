import {RoleType} from "./roleType.model";


export class User {
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  userName: string;
  email: string;
  address: string;
  mobile: string;
  joinDate: Date;
  roleName: string
  leaveDate: Date;
  passwordHash: string;
  lastLogin: Date;


  constructor(roleType: RoleType) {
    this.roleName = roleType.roleName;
  }
}
