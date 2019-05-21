import { RepositoryFunctionService } from './../shared/repository.function-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _functionService: RepositoryFunctionService) { }

  public hasWarnings: boolean = false;

  ngOnInit() {
    this.getWarnings();
  }

  public getWarnings = () => {
    this._functionService.checkDbIntegrity().subscribe(res => {
      let result = res as [];
      if(result.length > 0){
        this.hasWarnings = true;
      }
    })
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }
}
