"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CricketCoach_1 = require("./CricketCoach");
var GolfCoach_1 = require("./GolfCoach");
var cricketCoach = new CricketCoach_1.CricketCoach();
var golf = new GolfCoach_1.GolfCoach();
// array of Coach
var test = [];
test.push(cricketCoach);
test.push(golf);
for (var _i = 0, test_1 = test; _i < test_1.length; _i++) {
    var iterator = test_1[_i];
    console.log(iterator.getDailyWorkOut());
}
