import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private location: Location,
    private repository: RepositoryService
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl(new Date())
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createUser = (userFromValue) => {
    let newuser: User = {
      Id: "00000000-0000-0000-0000-000000000000",
      Name: userFromValue.name,
      DateOfBirth: userFromValue.dateOfBirth
    }
    this.repository.create('Users',newuser).subscribe(res => {
      this.location.back();
    });
  }

}
