import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shapes } from "./Shapes";



    let shapes=new Shapes(10,5);
    let circle=new Circle(10,5,25);
    let rectangle=new Rectangle(10,5,25,35);


    console.log(shapes.getInfo());
    console.log(circle.getInfo());
    console.log(rectangle.getInfo());

    

    
   
