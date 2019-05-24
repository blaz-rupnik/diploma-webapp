import { User } from './../users/user.model';
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

    public sendNotification = (person: string, dateFrom: string, dateTo: string) => {
      return this.http.get(`${environment.urlFunctionsAddress}/SendNotification?person=${person}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
    }

    public handleAbsenceRequest = (mode: number, absenceId: string) => {
      return this.http.get(`${environment.urlFunctionsAddress}/HandleAbsenceRequest?isAccepted=${mode}&absenceId=${absenceId}`);
    }
    public getTasks = () => {
      return this.http.get(`${environment.urlFunctionsAddress}/GetTasks`);
    }
    public getUsers = (userId?: string) => {
      if(userId){
        return this.http.get(`${environment.urlFunctionsAddress}/GetUsers?userId=${userId}`);
      }else{
        return this.http.get(`${environment.urlFunctionsAddress}/GetUsers`);
      }     
    }
    public deleteUser = (userId: string) => {
      return this.http.delete(`${environment.urlFunctionsAddress}/DeleteUser?userId=${userId}`);
    }
    public createUser = (user: User) => {
      return this.http.post(`${environment.urlFunctionsAddress}/CreateUser`, user, this.generateHeaders())
    }
    private generateHeaders = () => {
      return {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    }
}