import {Customer} from "./purchase-common/customer";
import {Pet} from "./purchase-common/pet";
import {Payment} from "./purchase-common/payment";
import {PaymentItem} from "./purchase-common/payment-item";
import {Ticket} from "./purchase-common/ticket";
import {TicketItem} from "./purchase-common/ticket-item";


export class Purchase {

  customer: Customer;
  pet: Pet;
  payment: Payment;
  paymentItem: PaymentItem;
  serviceId: number;
  ticket: Ticket;
  ticketItem: TicketItem;


}
