import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';
import { SummmaryGrade } from './summary-grade.model';

@Component({
  selector: 'app-home-summary',
  templateUrl: './home-summary.component.html',
  styleUrls: ['./home-summary.component.css']
})
export class HomeSummaryComponent implements OnInit {

  public dataSource: SummmaryGrade[];
  public elem: HTMLElement = document.getElementById('gradeChart');

  constructor(
    private functionRepoService: RepositoryFunctionService
  ) { }

  ngOnInit() {
    this.getGradeSummaryData();
    
  }

  public getGradeSummaryData = () => {
    this.functionRepoService.getGradeSummary().subscribe(res => {
      this.dataSource = res as SummmaryGrade[];
    })
  }
}
