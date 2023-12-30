let reviews:number[]=[5,4,2.5,4,1.6];
let total:number=0;
let average:number=0;

for (let index = 0; index < reviews.length; index++) {
    console.log(reviews[index]);
    total=total+reviews[index];       
}
console.log("The Total is "+total);
console.log("The Average is "+(total/reviews.length
))
