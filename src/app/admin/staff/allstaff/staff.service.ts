import { Injectable } from "@angular/core";
import { Staff } from "./staff.model";
import {Observable} from "rxjs";
import {User} from "./user.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
@Injectable()
export class StaffService {



  constructor(private httpClient: HttpClient) {
  }


  private readonly baseUrl = "http://localhost:8080/api/users";

  isTblLoading = true;
  // Temporarily stores data from dialogs
  dialogData: any;


  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaff(): Observable<User[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.users)
    );
  }
  addStaff(staff: Staff): void {
    this.dialogData = staff;

    /*  this.httpClient.post(this.API_URL, staff).subscribe(data => {
      this.dialogData = staff;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateStaff(staff: Staff): void {
    this.dialogData = staff;

    /* this.httpClient.put(this.API_URL + staff.id, staff).subscribe(data => {
      this.dialogData = staff;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteStaff(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}



interface GetResponse {
  _embedded: {
    users: User[];
  };
}
