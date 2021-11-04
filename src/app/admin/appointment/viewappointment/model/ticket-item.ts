import {User} from "../../../staff/allstaff/model/user.model";
import {Ticket} from "../../bookappointment/model/purchase-common/ticket";


export class TicketItem {

  ticketItemId: number;
  paymentStatus: string;
  ticketStatus: string;
  unitPrice: number;
  serviceId: number;
  ticket: Ticket;
  createdBy: User;
}



