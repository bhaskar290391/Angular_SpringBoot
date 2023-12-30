import { Coach } from "./Coach";

export class CricketCoach implements Coach{

    getDailyWorkOut(): string {
        return "Practise Fast bowling for 30 mins";
    }
    
}