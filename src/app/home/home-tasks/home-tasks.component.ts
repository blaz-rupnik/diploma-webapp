import { Component, OnInit } from '@angular/core';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';
import { Task } from './task.model';

@Component({
  selector: 'app-home-tasks',
  templateUrl: './home-tasks.component.html',
  styleUrls: ['./home-tasks.component.css']
})
export class HomeTasksComponent implements OnInit {

  public tasks: Task[]

  constructor(
    private _functionsRepoService: RepositoryFunctionService
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  public getTasks = () => {
    this._functionsRepoService.getTasks().subscribe(res => {
      this.tasks = res as Task[];
    })
  }

  public acceptTask = (task: Task) => {
    if(task.TaskAction === 0){
      this._functionsRepoService.handleAbsenceRequest(1,task.EntityInstanceId).subscribe(res => {
        this.getTasks();
      });
    }
  }

  public rejectTask = (task: Task) => {
    if(task.TaskAction === 0){
      this._functionsRepoService.handleAbsenceRequest(0,task.EntityInstanceId).subscribe(res => {
        this.getTasks();
      });
    }
  }

}
