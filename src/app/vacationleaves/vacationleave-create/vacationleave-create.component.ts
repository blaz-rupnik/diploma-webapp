import { VacationLeave } from './../vacationleave.model';
import { User } from './../../users/user.model';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/repository.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vacationleave-create',
  templateUrl: './vacationleave-create.component.html',
  styleUrls: ['./vacationleave-create.component.css']
})
export class VacationleaveCreateComponent implements OnInit {

  public vacationLeaveForm: FormGroup;
  public listDataSource: User[];
  public selectedUser: string;

  constructor(
    private repoService: RepositoryService,
    private location: Location
  ) { }

  ngOnInit() {
    //fill user dropdown
    this.fillUserDropdown();

    this.vacationLeaveForm = new FormGroup({
      user: new FormControl('',[Validators.required]),
      dateFrom: new FormControl(new Date(), [Validators.required]),
      dateTo: new FormControl(new Date(), [Validators.required])
    })
  }

  public onCancel = () => {
    this.location.back();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.vacationLeaveForm.controls[controlName].hasError(errorName);
  } 

  public fillUserDropdown = () => {
    this.repoService.getData('Users').subscribe(res => {
      this.listDataSource = res as User[];
    })
  }

  public createVacationLeave = (vacationLeaveFormValue) => {
    let newvacationleave: VacationLeave = {
      Id: "00000000-0000-0000-0000-000000000000",
      DateFrom: vacationLeaveFormValue.dateFrom,
      DateTo: vacationLeaveFormValue.dateTo,
      UserId: vacationLeaveFormValue.user
    }
    this.repoService.create('VacationLeaves',newvacationleave).subscribe(res => {
      this.location.back();
    });
  }

}