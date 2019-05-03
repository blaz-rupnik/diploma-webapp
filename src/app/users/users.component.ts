import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { User } from './user.model';
import { RepositoryService } from '../shared/repository.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>();
  public displayedColumns = ['Name','DateOfBirth','details','update','delete'];

  constructor(
    private repoService: RepositoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();  
  }

  public getUsers = () => {
    this.repoService.getData('Users').subscribe(res => {
      this.dataSource.data = res as User[];
    })
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/user/${id}`;
    this.router.navigate([url]);
  }

  public deleteUser = (id: string) => {
    this.repoService.delete(`Users/${id}`).subscribe(res => {
      console.log("success");
    })
  }

}
