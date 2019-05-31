import { DataService } from './../shared/data.service';
import { MonthlyRating } from './monthlyrating.model';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RepositoryFunctionService } from '../shared/repository.function-service';
import { User } from '../users/user.model';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monthlyratings',
  templateUrl: './monthlyratings.component.html',
  styleUrls: ['./monthlyratings.component.css']
})
export class MonthlyratingsComponent implements OnInit, OnDestroy {
  selected = '';
  public chosenUser: string = "";
  public userDataSource: User[];
  public dataSource = new MatTableDataSource<MonthlyRating>();
  public displayedColumns = ['Name','Year','Month','Grade','delete'];

  constructor(
    private functionRepoService: RepositoryFunctionService,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.fillUserDropdown();
  }

  ngOnDestroy() {
    this.dataService.requestedId = this.chosenUser;
  }

  public changeUser = (id: string) => {
    if(id !== undefined && id !== null){
      this.fillMonthlyRatingData(id);
      this.chosenUser = id;
    }
  }

  public fillMonthlyRatingData = (id) => {
    this.functionRepoService.getMonthlyRatings(id).subscribe(res => {
      this.dataSource.data = res as MonthlyRating[];
    })
  }

  public fillUserDropdown = () => {
    this.functionRepoService.getUsers().subscribe(res => {
      this.userDataSource = res as User[];
      if(this.dataService.requestedId !== ''){
        let exists = this.userDataSource.find(x => x.Id === this.dataService.requestedId);
        if(exists !== undefined){
          this.selected = this.dataService.requestedId;
          this.fillMonthlyRatingData(this.selected);
        }
      }
    })
  }

  public deleteMonthlyRating = (id) => {
    this.functionRepoService.deleteMonthlyRating(id).subscribe(res => {
      this.toastr.success("Mesečna ocena je bila izbrisana.", '', { positionClass: 'toast-top-center' });
      this.fillMonthlyRatingData(this.chosenUser);
    });
  }

}
