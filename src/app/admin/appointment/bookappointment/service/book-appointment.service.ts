import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Service} from "../model/service.model";
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../model/purchase.model";
import {Customer} from "../model/purchase-common/customer";
import {Pet} from "../model/purchase-common/pet";

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {


  private servicesUrl = "http://localhost:8080/api/services";
  private createPurchaseService = "http://localhost:8080/api/purchase/purchaseService";

  customerCached: Customer;
  petCached: Pet;

  constructor(private httpClient: HttpClient) { }



  purchaseService(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.createPurchaseService, purchase);
  }



  getServices(): Observable<Service[]> {
    return this.httpClient.get<GetResponseServices>(this.servicesUrl).pipe(
      map(response => response._embedded.services)
    );
  }
}




interface GetResponseServices {
  _embedded: {
    services: Service[];
  };
}
