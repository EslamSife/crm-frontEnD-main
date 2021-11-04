import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import { Appointment } from "../model/appointment.model";
import { HttpClient } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {map} from "rxjs/operators";
import {Ticket} from "../model/ticket";
import {TicketItem} from "../model/ticket-item";
@Injectable()
export class AppointmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "assets/data/appointment.json";
  private readonly TICKETS_URL = "http://localhost:8080/api/appointment/ticket";
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointment[]> = new BehaviorSubject<
    Appointment[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Appointment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
 /* getAllAppointments(): void {
    this.subs.sink = this.httpClient.get<Appointment[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }*/

  getAllAppointments(): Observable<TicketItem[]> {
    return this.httpClient.get<TicketItem[]>(this.TICKETS_URL);
  }




  addAppointment(appointment: Appointment): void {
    this.dialogData = appointment;

    /*  this.httpClient.post(this.API_URL, appointment).subscribe(data => {
      this.dialogData = appointment;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateAppointment(appointment: Appointment): void {
    this.dialogData = appointment;

    /* this.httpClient.put(this.API_URL + appointment.id, appointment).subscribe(data => {
      this.dialogData = appointment;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteAppointment(id: number): void {
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
    tickets: Ticket[];
}
