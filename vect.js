var Vect = (function() {
    var vect = {};

    vect.create = function(x, y) {
        return [x, y];
    };

    vect.add = function(v, w) {
        return [v[0] + w[0], v[1] + w[1]];
    };

    vect.subtract = function(v, w) {
        return [v[0] - w[0], v[1] - w[1]];
    };

    vect.scale = function(a, v) {
        return [a * v[0], a * v[1]];
    };

    return vect;
}());

var x = Vect.create(1, 3);  // [1, 3]
var y = Vect.create(-1, 0); // [-1, 0]
console.log(Vect.add(x, Vect.scale(2, y)));
    // => [-1, 3]
