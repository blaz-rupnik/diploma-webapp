import { VacationLeave } from './vacationleave.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RepositoryService } from '../shared/repository.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.getVacationLeaves();
  }

  public getVacationLeaves = () => {
    this.repoService.getData('VacationLeaves').subscribe(res => {
      this.dataSource.data = res as VacationLeave[];
    })
  }

  public deleteVacationLeave = (id: string) => {
    this.repoService.delete(`VacationLeaves/${id}`).subscribe(res => {
      this.getVacationLeaves();
    })
  }

}
