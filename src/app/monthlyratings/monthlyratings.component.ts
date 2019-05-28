import { MonthlyRating } from './monthlyrating.model';
import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from '../shared/repository.function-service';
import { User } from '../users/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-monthlyratings',
  templateUrl: './monthlyratings.component.html',
  styleUrls: ['./monthlyratings.component.css']
})
export class MonthlyratingsComponent implements OnInit {

  public userDataSource: User[];
  public dataSource = new MatTableDataSource<MonthlyRating>();
  public displayedColumns = ['Name','Year','Month','Grade','delete'];

  constructor(
    private functionRepoService: RepositoryFunctionService
  ) { }

  ngOnInit() {
    this.fillUserDropdown();
  }

  public changeUser = (id: string) => {
    if(id !== undefined && id !== null){
      this.fillMonthlyRatingData(id);
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
    })
  }

}
