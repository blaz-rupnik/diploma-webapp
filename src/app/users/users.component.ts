import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from './user.model';
import { RepositoryService } from '../shared/repository.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>();
  public displayedColumns = ['Name','DateOfBirth'];
  
  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.getUsers();  
  }

  public getUsers = () => {
    this.repoService.getData('Users').subscribe(res => {
      this.dataSource.data = res as User[];
      console.log("success");
    })
  }

}
