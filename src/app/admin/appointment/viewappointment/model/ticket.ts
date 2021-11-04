import {Customer} from "../../bookappointment/model/purchase-common/customer";
import {Pet} from "../../bookappointment/model/purchase-common/pet";
import {Payment} from "../../bookappointment/model/purchase-common/payment";
import {PaymentItem} from "../../bookappointment/model/purchase-common/payment-item";
import {TicketItem} from "../../bookappointment/model/purchase-common/ticket-item";
import {User} from "../../../staff/allstaff/model/user.model";

export class Ticket {

  customer: Customer;
  pet: Pet;
  payment: Payment;
  paymentItem: PaymentItem;
  serviceId: number;
  ticket: Ticket;
  ticketItem: TicketItem;
  user: User;

}
