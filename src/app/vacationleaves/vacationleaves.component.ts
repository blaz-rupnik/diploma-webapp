import { VacationLeave } from './vacationleave.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RepositoryService } from '../shared/repository.service';
import { Router } from '@angular/router';
import { RepositoryFunctionService } from '../shared/repository.function-service';

@Component({
  selector: 'app-vacationleaves',
  templateUrl: './vacationleaves.component.html',
  styleUrls: ['./vacationleaves.component.css']
})
export class VacationleavesComponent implements OnInit {

  public dataSource = new MatTableDataSource<VacationLeave>();
  public displayedColumns = ['Name','DateFrom','DateTo','Status','delete'];

  constructor(
    private repoService: RepositoryService,
    private functionsRepoService: RepositoryFunctionService
  ) { }

  ngOnInit() {
    this.getVacationLeaves();
  }

  public getVacationLeaves = () => {
    this.functionsRepoService.getVacationLeaves().subscribe(res => {
      this.dataSource.data = res as VacationLeave[];
    })
  }

  public deleteVacationLeave = (id: string) => {
    this.functionsRepoService.deleteVacationLeave(id).subscribe(res => {
      this.getVacationLeaves();
    })
  }

}
