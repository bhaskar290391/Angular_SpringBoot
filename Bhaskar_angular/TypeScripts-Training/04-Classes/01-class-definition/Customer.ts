class Customer{
    firstName:string;
    lastName:string;

    constructor(theFirstName,theLastName){
        this.firstName=theFirstName;
        this.lastName=theLastName
    }
}

let customer=new Customer("Bhaskar","Mudaliyar");
console.log(customer.firstName);
console.log(customer.lastName);