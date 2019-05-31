import { RepositoryFunctionService } from './../../shared/repository.function-service';
import { VacationLeave } from './../vacationleave.model';
import { User } from './../../users/user.model';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/repository.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

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
    private functionRepoService: RepositoryFunctionService,
    private location: Location,
    private toastr: ToastrService
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
    this.functionRepoService.getUsers().subscribe(res => {
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
    this.functionRepoService.createVacationLeave(newvacationleave).subscribe(res => {
      var vacationLeaveData = res as VacationLeave;
      var dateFrom = moment(vacationLeaveData.DateFrom).format('YYYY-MM-DD');
      var dateTo = moment(vacationLeaveData.DateTo).format('YYYY-MM-DD');
      //send notification of new vacation leave request
      this.functionRepoService.getUsers(newvacationleave.UserId).subscribe(res => {
        var user = res as User;
        this.functionRepoService.sendNotification(user.Name,dateFrom,dateTo).subscribe(res => {
          this.location.back();
          this.toastr.success('Ustvarjena zahteva za letni dopust.','', { positionClass: 'toast-top-center' });
        });
      });     
    }, error => {
      console.log(error);
    });
  }

}