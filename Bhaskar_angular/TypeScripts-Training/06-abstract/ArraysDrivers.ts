import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shapes } from "./Shapes";


    let circle=new Circle(10,5,25);
    let rectangle=new Rectangle(10,5,25,35);

    //declaring arrays of shapes
    let shapesTest:Shapes[]=[];
    
    shapesTest.push(circle);
    shapesTest.push(rectangle);

    for (let iterator of shapesTest) {
      console.log(iterator.getInfo())  
      console.log(iterator.calculateArea());
      console.log();
    }

    

    
   
