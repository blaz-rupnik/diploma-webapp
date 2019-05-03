import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;

  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUserDetails();
  }

  private getUserDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `/Users/${id}`;

    this.repository.getData(apiUrl).subscribe(res => {
      this.user = res as User;
      console.log(this.user);
    })
  }

}
