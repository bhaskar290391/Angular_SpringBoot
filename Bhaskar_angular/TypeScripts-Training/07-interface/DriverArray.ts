import { Coach } from "./Coach";
import { CricketCoach } from "./CricketCoach";
import { GolfCoach } from "./GolfCoach";

let cricketCoach:Coach=new CricketCoach();
let golf:Coach=new GolfCoach();

// array of Coach
let test:Coach[]=[];

test.push(cricketCoach);
test.push(golf);

for (const iterator of test) {
    console.log(iterator.getDailyWorkOut());
}
