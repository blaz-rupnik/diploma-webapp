import { VacationLeave } from './../vacationleaves/vacationleave.model';
import { User } from './../users/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MonthlyRating } from '../monthlyratings/monthlyrating.model';
 
@Injectable({
  providedIn: 'root'
})
export class RepositoryFunctionService{
    constructor(private http: HttpClient){ }

    //workflows, etc
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

    //users
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

    //monthly ratings
    public getMonthlyRatings = (userId: string) => {
      return this.http.get(`${environment.urlFunctionsAddress}/GetMonthlyGrades?userId=${userId}`);
    }

    public createMonthlyRating = (monthlyrating: MonthlyRating) => {
      return this.http.post(`${environment.urlFunctionsAddress}/CreateMonthlyGrade`, monthlyrating, this.generateHeaders());
    }

    //vacation leaves
    public getVacationLeaves = (absenceId?: string) => {
      if(absenceId){
        return this.http.get(`${environment.urlFunctionsAddress}/GetVacationLeaves?absenceId=${absenceId}`);
      }else{
        return this.http.get(`${environment.urlFunctionsAddress}/GetVacationLeaves`);
      }
    }
    public deleteVacationLeave = (absenceId: string) => {
      return this.http.delete(`${environment.urlFunctionsAddress}/DeleteVacationLeave?absenceId=${absenceId}`);
    }
    public createVacationLeave = (absence: VacationLeave) => {
      return this.http.post(`${environment.urlFunctionsAddress}/CreateVacationLeave`, absence, this.generateHeaders());
    }

    //private helpers
    private generateHeaders = () => {
      return {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    }
}