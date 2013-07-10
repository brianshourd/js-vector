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

var result = Vect.add(Vect.add([1, 1], Vect.scale(2, [3, 0])), Vect.subtract([0, 2], Vect.scale(7, [1, -1])));
console.log(result); // => [0, 10]

function f1(w, x, y, z) {
    return Vect.add(Vect.add(w, Vect.scale(2, y)), Vect.subtract(z,
Vect.scale(7, y)));
}

function f2(w, x, y, z) {
    return [
        w[0] + 2 * x[0] - 7 * y[0] + z[0],
        w[1] + 2 * x[1] - 7 * y[1] + z[1]];
}

function f3(w, x, y, z) {
    var temp = function(w, x, y, z) {
        return w + 2 * x - 7 * y + z;
    };
    return [
        temp(w[0], x[0], y[0], z[0]),
        temp(w[1], x[1], y[1], z[1])];
}

function f4(w, x, y, z) {
    var temp = function(w, x, y, z) {
        return w + 2 * x - 7 * y + z;
    };
    return _.map([0, 1], function(index) {
        return temp.apply(null, _.map([w, x, y, z], function(ary) {
            return ary[index];
        }));
    });
}

console.log(f4([1,1], [3,0], [1,-1], [0,2])); // => [0, 10]
