import { User } from './../users/user.model';
export interface VacationLeave {
    Id: string,
    DateFrom: Date,
    DateTo: Date,
    UserId: string,
    User?: User,
    Status?: VacationRequestStatus
}

export interface VacationRequestStatus {
    Id: string,
    Name: string
}