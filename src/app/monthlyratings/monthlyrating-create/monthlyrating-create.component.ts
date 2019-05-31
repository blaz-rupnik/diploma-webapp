import { MonthlyRating } from './../monthlyrating.model';
import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/users/user.model';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-monthlyrating-create',
  templateUrl: './monthlyrating-create.component.html',
  styleUrls: ['./monthlyrating-create.component.css']
})
export class MonthlyratingCreateComponent implements OnInit {

  public monthlyRatingForm: FormGroup;
  public listDataSource: User[];
  public selectedUser: string;

  constructor(
    private functionRepoService: RepositoryFunctionService,
    private location: Location,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    //fill user dropdown
    this.fillUserDropdown();
    this.monthlyRatingForm = new FormGroup({
      user: new FormControl('',[Validators.required]),
      year: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.max(12), Validators.min(1), Validators.required]),
      grade: new FormControl('', [Validators.max(5),Validators.min(1),Validators.required])
    })
  }

  public onCancel = () => {
    this.location.back();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.monthlyRatingForm.controls[controlName].hasError(errorName);
  } 

  public fillUserDropdown = () => {
    this.functionRepoService.getUsers().subscribe(res => {
      this.listDataSource = res as User[];
      if(this.dataService.requestedId !== ''){
        //check if user exists
        let exists = this.listDataSource.find(x => x.Id === this.dataService.requestedId);
        if(exists !== undefined){
          this.monthlyRatingForm.get('user').setValue(this.dataService.requestedId);
        }
      }
    })
  }

  public createMonthlyRating = (monthlyRatingFormValue) => {
    let newmonthlyrating: MonthlyRating = {
      Id: "00000000-0000-0000-0000-000000000000",
      Year: monthlyRatingFormValue.year,
      Month: monthlyRatingFormValue.month,
      Grade: monthlyRatingFormValue.grade,
      UserId: monthlyRatingFormValue.user
    }
    
    this.functionRepoService.createMonthlyRating(newmonthlyrating).subscribe(res => {
      this.location.back();
      this.toastr.success("Mesečna ocena je bila ustvarjena.", '', { positionClass: 'toast-top-center' });    
    });
  }

}
