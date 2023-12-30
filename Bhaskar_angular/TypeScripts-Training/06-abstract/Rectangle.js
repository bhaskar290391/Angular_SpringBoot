"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Shapes_1 = require("./Shapes");
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(_length, _breadth, first, second) {
        var _this = _super.call(this, first, second) || this;
        _this._length = _length;
        _this._breadth = _breadth;
        return _this;
    }
    Object.defineProperty(Rectangle.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "breadth", {
        get: function () {
            return this._breadth;
        },
        set: function (value) {
            this._breadth = value;
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this) + ", length=".concat(this._length, ", breath=").concat(this._breadth);
    };
    Rectangle.prototype.calculateArea = function () {
        return this._length * this._breadth;
    };
    return Rectangle;
}(Shapes_1.Shapes));
exports.Rectangle = Rectangle;
