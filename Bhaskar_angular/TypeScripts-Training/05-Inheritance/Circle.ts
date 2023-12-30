import { Shapes } from "./Shapes";

export class Circle extends Shapes{

   
    
    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    constructor(first:number,second:number, private _radius: number){
        super(first,second)
    }

    getInfo(): string{
        return super.getInfo()+`, radius=${this._radius}`
    }

}