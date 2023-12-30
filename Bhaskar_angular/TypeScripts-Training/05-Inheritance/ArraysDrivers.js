"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var Shapes_1 = require("./Shapes");
var shapes = new Shapes_1.Shapes(10, 5);
var circle = new Circle_1.Circle(10, 5, 25);
var rectangle = new Rectangle_1.Rectangle(10, 5, 25, 35);
//declaring arrays of shapes
var shapesTest = [];
shapesTest.push(shapes);
shapesTest.push(circle);
shapesTest.push(rectangle);
for (var _i = 0, shapesTest_1 = shapesTest; _i < shapesTest_1.length; _i++) {
    var iterator = shapesTest_1[_i];
    console.log(iterator.getInfo());
}
