"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shapes = void 0;
var Shapes = /** @class */ (function () {
    function Shapes(_first, _second) {
        this._first = _first;
        this._second = _second;
    }
    Object.defineProperty(Shapes.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (value) {
            this._first = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shapes.prototype, "second", {
        get: function () {
            return this._second;
        },
        set: function (value) {
            this._second = value;
        },
        enumerable: false,
        configurable: true
    });
    Shapes.prototype.getInfo = function () {
        return "x=".concat(this._first, ",y=").concat(this._second);
    };
    return Shapes;
}());
exports.Shapes = Shapes;
