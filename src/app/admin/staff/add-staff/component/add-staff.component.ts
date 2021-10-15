import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AddStuffService} from "../service/add-stuff.service";
import {Staff} from "../model/staff.model";
import {RoleType} from "../model/roleType.model";
@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.sass"],
})
export class AddStaffComponent  implements OnInit {
  staffForm: FormGroup;
  hide3 = true;
  roles: RoleType[] = [];
  mySelect = [];



  constructor(private fb: FormBuilder, private addStuffService: AddStuffService) {
    this.staffForm = this.fb.group({
        firstName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        lastName: [""],
        gender: ["", [Validators.required]],
        mobile: ["", [Validators.required]],
        password: ["", [Validators.required]],
        conformPassword: ["", [Validators.required]],
        designation: [""],
        department: [""],
        address: [""],
        email: [
          "",
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        dob: ["", [Validators.required]],
        education: [""],
        uploadImg: [""],
    });
  }


  ngOnInit(): void {
    this.addStuffService.getRoles().subscribe(
      data => {
        console.log("Retrieved roles : " + JSON.stringify(data));
        this.roles = data;
      }
    );
  }

  resetForm() {
    this.staffForm.reset();
  }

  onSubmit() {
    console.log("Form Value", this.staffForm.value);
    const staff = new Staff();
    staff.roleType = this.staffForm.controls['department'].value;
    staff.firstName = this.staffForm.controls['firstName'].value;
    staff.lastName = this.staffForm.controls['lastName'].value;
    staff.gender = this.staffForm.controls['gender'].value;
    staff.passwordHash = this.staffForm.controls['password'].value;
    staff.address = this.staffForm.controls['address'].value;
    staff.email = this.staffForm.controls['email'].value;
    console.log(JSON.stringify(staff));
    this.addStuffService.createStaff(staff).subscribe({
      next: response => {
        alert(`you add new staff successfully. staff first name : ${response.staff.firstName} `);
        this.resetForm();
      },
      error: err => {
        alert(`there was an error  : ${err.message} `);
  }
    });
  }
}
