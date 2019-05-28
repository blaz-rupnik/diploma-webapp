import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';
import { SummmaryGrade } from './summary-grade.model';
import { Chart } from 'chart.js';

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
    var ctx = document.getElementById("gradeChart");
    console.log(ctx);
    new Chart(ctx, {
      type: 'bar',
      labels: ["Januar", "Februar"],
      datasets: [
        {
          label: "Povprečna ocena",
          data: [35, 50]
        }
      ],
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: 'Povprečne ocene'
        }
      }
    });
  }

  public getGradeSummaryData = () => {
    this.functionRepoService.getGradeSummary().subscribe(res => {
      this.dataSource = res as SummmaryGrade[];
      console.log(this.dataSource);
    })
  }
}
