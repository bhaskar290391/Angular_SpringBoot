var reviews = [5, 4, 2.5, 4, 1.6];
var total = 0;
var average = 0;
for (var index = 0; index < reviews.length; index++) {
    console.log(reviews[index]);
    total = total + reviews[index];
}
console.log("The Total is " + total);
console.log("The Average is " + (total / reviews.length));
