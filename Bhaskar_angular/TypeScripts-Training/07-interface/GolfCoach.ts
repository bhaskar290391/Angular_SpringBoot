import { Coach } from "./Coach";

export class GolfCoach implements Coach{

    getDailyWorkOut(): string {
        return "Hit 100 balls on golf circle range";
    }
    
}