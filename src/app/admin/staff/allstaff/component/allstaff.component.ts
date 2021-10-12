import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { StaffService } from "../service/staff.service";
import { HttpClient } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { Staff } from "../model/staff.model";
import { SelectionModel } from "@angular/cdk/collections";
import {User} from "../model/user.model";
@Component({
  selector: "app-allstaff",
  templateUrl: "./allstaff.component.html",
  styleUrls: ["./allstaff.component.sass"],
})
export class AllstaffComponent implements OnInit {


  users: User[];


  displayedColumns = [
    "select",
    "name",
    "designation",
    "mobile",
    "email",
    "date",
    "address",
    "actions",
  ];
  selection = new SelectionModel<User>(true, []);
  index: number;
  id: number;
  staff: Staff | null;
  constructor(
    public httpClient: HttpClient,
    public staffService: StaffService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.users.forEach((row) =>
          this.selection.select(row)
        );
  }



  public loadData() {
    this.staffService.getAllStaff().subscribe(
      data => {
        this.users = data;
        this.users.forEach((e) => {
          console.log(e.email);
        });
      }
    );
  }

}
