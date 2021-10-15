import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../model/service.model";
import {BookAppointmentService} from "../service/book-appointment.service";
import {Purchase} from "../model/purchase.model";
import {Customer} from "../model/purchase-common/customer";
import {Ticket} from "../model/purchase-common/ticket";
import {TicketItem} from "../model/purchase-common/ticket-item";
import {PaymentItem} from "../model/purchase-common/payment-item";
import {Payment} from "../model/purchase-common/payment";
import {Pet} from "../model/purchase-common/pet";

@Component({
  selector: "app-bookappointment",
  templateUrl: "./bookappointment.component.html",
  styleUrls: ["./bookappointment.component.sass"],
})
export class BookappointmentComponent implements OnInit {


  hide = true;
  selectedServiceID: number;


  services: Service[] = [];

  isLinear = false;
  customerForm: FormGroup;
  nutritionInfoForm: FormGroup;
  petStatusForm: FormGroup;
  problemsForm: FormGroup;
  servicesForm: FormGroup;


  bookingForm: FormGroup;
  hide3 = true;
  agree3 = false;


  constructor(private fb: FormBuilder, private bookAppointmentService: BookAppointmentService) {
  }


  initForm() {
    this.customerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [""],
      address: [""],
      mobile: ["", Validators.required],
    });
    this.nutritionInfoForm = this.fb.group({
      lastFed: [""],
      diet: [""],
      foodType: [""],
      favFood: [""],
      dislike: [""],
    });
    this.problemsForm = this.fb.group({
      prevProblem: [""],
      currProblem: [""],
    });
    this.petStatusForm = this.fb.group({
      attitude: [""],
      appetite: [""],
      thirst: [""],
      urination: [""],
      defecation: [""],
      vomiting: [""],
      respiratorySigns: [""],
      mobility: [""],
      behavior: [""]
    });
    this.servicesForm = this.fb.group({
      serviceName: ["", Validators.required],
    });
  }


  ngOnInit() {
    this.initForm();
    this.bookAppointmentService.getServices().subscribe(
      data => {
        console.log("Retrieved services : " + JSON.stringify(data));
        this.services = data;
      }
    );
  }


  onCustomerRegister() {
    console.log("Form Value", this.customerForm.value);
    const customer = new Customer();
    customer.firstName = this.customerForm.controls.firstName.value;
    customer.lastName = this.customerForm.controls.lastName.value;
    customer.mobile = this.customerForm.controls.mobile.value;
    customer.email = this.customerForm.controls.email.value;
    customer.address = this.customerForm.controls.address.value;
    this.bookAppointmentService.customerCached = customer;
    console.log(JSON.stringify(this.bookAppointmentService.customerCached ));
  }

  onPetRegister() {
    console.log("Form Value", this.petStatusForm.value);
    const pet = new Pet();
    pet.name = this.nutritionInfoForm.controls.diet.value;
    this.bookAppointmentService.petCached = pet;
  }


  getServiceId(service) {
    console.log(" service id is " + service.serviceId);
    this.selectedServiceID = service.serviceId;
  }

  resetForm() {
    this.servicesForm.reset();
  }



  onSubmit() {
    const purchase = new Purchase();
    const customer = new Customer();
    const pet = new Pet();
    const ticket = new Ticket();
    const ticketItem = new TicketItem();
    const paymentItem = new PaymentItem();
    const payment = new Payment();
    payment.paymentType = 'open';
    payment.totalPrice = 300;
    paymentItem.unitPrice = 300;
    // paymentItem.dateCreated = new Date();

    purchase.serviceId = this.selectedServiceID;

    ticket.totalPrice = payment.totalPrice;
    ticketItem.unitPrice = paymentItem.unitPrice;


    purchase.customer = this.bookAppointmentService.customerCached;
    purchase.pet = this.bookAppointmentService.petCached;
    purchase.ticket = ticket;
    purchase.ticketItem = ticketItem;
    purchase.payment = payment;
    purchase.paymentItem = paymentItem;

    console.log(JSON.stringify(purchase));

    this.bookAppointmentService.purchaseService(purchase).subscribe({
      next: response => {
        alert(`you add new book successfully. customer first name : ${response.purchase.customer.firstName} `);
        this.resetForm();
      },
      error: err => {
        alert(`there was an error  : ${err.message} `);
      }
    });
  }
}
