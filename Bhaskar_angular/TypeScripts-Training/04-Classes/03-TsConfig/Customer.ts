class Customer{
    private _firstName !: string;
    private _lastName!: string;

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    constructor(theFirstName: string,theLastName: string){
        this.firstName=theFirstName;
        this.lastName=theLastName
    }
}

let customer=new Customer("Bhaskar","Maddy");
console.log(customer.firstName);
console.log(customer.lastName);