import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Staff} from "../model/staff.model";
import {RoleType} from "../model/roleType.model";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AddStuffService {

  private rolesUrl = "http://localhost:8080/api/roles";
  private createStaffUrl = "http://localhost:8080/api/staff/createStaff";

  constructor(private httpClient: HttpClient) { }



  createStaff(staff: Staff): Observable<any> {
    return this.httpClient.post<Staff>(this.createStaffUrl, staff);
  }

  getRoles(): Observable<RoleType[]> {
    return this.httpClient.get<GetResponseRoles>(this.rolesUrl).pipe(
      map(response => response._embedded.roles)
    );
  }
}


interface GetResponseRoles {
  _embedded: {
    roles: RoleType[];
  };
}
