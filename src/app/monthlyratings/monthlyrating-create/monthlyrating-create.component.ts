import { MonthlyRating } from './../monthlyrating.model';
import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/users/user.model';
import { Location } from '@angular/common';

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
    private location: Location
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
    });
  }

}
