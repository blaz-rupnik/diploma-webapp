import { User } from './../users/user.model';
export interface MonthlyRating {
    Id: string,
    Year: number,
    Month: number,
    Grade: number,
    UserId: string,
    User?: User
}