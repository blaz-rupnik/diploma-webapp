import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class RepositoryFunctionService{
    constructor(private http: HttpClient){ }

    public checkDbIntegrity = () => {
        return this.http.get(`${environment.urlFunctionsAddress}/CheckIntegrity`);
    }
}