import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import { RepositoryFunctionService } from '../shared/repository.function-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>();
  public displayedColumns = ['Name','DateOfBirth','details','delete'];

  constructor(
    private toastr: ToastrService,
    private functionRepoService: RepositoryFunctionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();  
  }

  public getUsers = () => {
    this.functionRepoService.getUsers().subscribe(res => {
      this.dataSource.data = res as User[];
    })
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/user/${id}`;
    this.router.navigate([url]);
  }

  public deleteUser = (id: string) => {
    this.functionRepoService.deleteUser(id).subscribe(res => {
      this.getUsers();
      this.toastr.success("Uporabnik je bil izbrisan");
    })
  }

}
