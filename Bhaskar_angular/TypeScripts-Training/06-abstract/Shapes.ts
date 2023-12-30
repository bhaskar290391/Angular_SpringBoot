export abstract class Shapes{

    constructor( private _first: number,
        private _second: number){

    }

    public get first(): number {
        return this._first;
    }
    public set first(value: number) {
        this._first = value;
    }
    
    public get second(): number {
        return this._second;
    }
    public set second(value: number) {
        this._second = value;
    }

    getInfo(): string{
        return `x=${this._first},y=${this._second}`
    }

    abstract calculateArea():number;
}