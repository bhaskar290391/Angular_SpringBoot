import { Shapes } from "./Shapes";

export class Rectangle extends Shapes{


    public get length(): number {
        return this._length;
    }
    public set length(value: number) {
        this._length = value;
    }
  
    public get breadth(): number {
        return this._breadth;
    }
    public set breadth(value: number) {
        this._breadth = value;
    }
    

    constructor( private _length: number,
        private _breadth: number,first:number,  second: number){
        super(first,second)
    }

    getInfo(): string{
        return super.getInfo()+`, length=${this._length}, breath=${this._breadth}`;
    }

    calculateArea(): number {
        
        return this._length *this._breadth;
    }

}