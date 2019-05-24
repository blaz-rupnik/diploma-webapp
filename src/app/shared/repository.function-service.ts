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
}