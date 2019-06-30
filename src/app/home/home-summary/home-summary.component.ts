import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';
import { SummmaryGrade, PieData } from './summary-grade.model';
import { ErrorHandlerService } from 'src/app/shared/errorhandler.service';

@Component({
  selector: 'app-home-summary',
  templateUrl: './home-summary.component.html',
  styleUrls: ['./home-summary.component.css']
})
export class HomeSummaryComponent implements OnInit {
  public pieDataSource: PieData[];
  public dataSource: SummmaryGrade[];
  public elem: HTMLElement = document.getElementById('gradeChart');

  constructor(
    private functionRepoService: RepositoryFunctionService,
    private errorLog: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.getGradeSummaryData();
    this.pieDataSource = [{
      Type: "Delovni dnevi", Quantity: 220,
    },{
      Type: "Dela prosti dnevi", Quantity: 14,
    },{
      Type: "Namenjen dopust", Quantity: 25
    }];
  }

  public getGradeSummaryData = () => {
    this.functionRepoService.getGradeSummary().subscribe(res => {
      this.dataSource = res as SummmaryGrade[];
    }, error => {
      this.errorLog.writeError(error.message).subscribe(res => {console.log("error logged.")})
    })
  }
}
