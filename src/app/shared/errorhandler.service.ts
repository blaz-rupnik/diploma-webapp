import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService{
    constructor(private http: HttpClient){}

    public writeError(message: string){
        return this.http.post(`${environment.urlFunctionsAddress}/WriteToLog`,this.createCustomLog(message), this.generateHeaders());
    }

    private generateHeaders = () => {
        return {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
      }

    private createCustomLog(message: string): CustomLog {
        return {Message: message, Timestamp: new Date()}
    }
}

interface CustomLog {
    Message: string,
    Timestamp: Date
}