import { VacationLeave } from './vacationleave.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RepositoryService } from '../shared/repository.service';
import { Router } from '@angular/router';
import { RepositoryFunctionService } from '../shared/repository.function-service';
import { ToastrService } from 'ngx-toastr';

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
    private functionsRepoService: RepositoryFunctionService,
    private toastr: ToastrService
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
      this.toastr.success('Letni dopust je bil odstranjen.','', { positionClass: 'toast-top-center' });
      this.getVacationLeaves();
    })
  }

}
