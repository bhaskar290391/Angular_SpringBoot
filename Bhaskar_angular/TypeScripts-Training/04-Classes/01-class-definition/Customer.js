var Customer = /** @class */ (function () {
    function Customer(theFirstName, theLastName) {
        this.firstName = theFirstName;
        this.lastName = theLastName;
    }
    return Customer;
}());
var customer = new Customer("Bhaskar", "Mudaliyar");
console.log(customer.firstName);
console.log(customer.lastName);
