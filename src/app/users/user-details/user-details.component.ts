import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { RepositoryFunctionService } from 'src/app/shared/repository.function-service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;

  constructor(
    //private repository: RepositoryService,
    private functionRepoService: RepositoryFunctionService,
    //private router: Router, 
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUserDetails();
  }

  private getUserDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `/Users/${id}`;

    this.functionRepoService.getUsers(id).subscribe(res => {
      this.user = res as User;
    })
  }

}
