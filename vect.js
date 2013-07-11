var Vect = (function() {
    var vect = {};

    vect.create = function() {
        return _.toArray(arguments);
    };

    vect.vectorize = function(fun) {
        return function() {
            var args = _.toArray(arguments);
            return _.map(_.range(args[0].length), function(index) {
                return fun.apply(null, _.map(args, function(ary) {
                    return ary[index];
                }));
            });
        };
    }

    vect.add = vect.vectorize(function(v, w) {
        return v + w;
    });

    vect.subtract = vect.vectorize(function(v, w) {
        return v - w;
    });

    vect.scale = function(a, v) {
        return vect.vectorize(function(v) { return a * v; })(v);
    };

    return vect;
}());

var f = Vect.vectorize(function(w, x, y, z) {
    return w + 2*x - 7*y + z;
});
var g = Vect.vectorize(function(w, x, y, z) {
    return w + 4*x + 5*y + 6*z;
});
var h = Vect.vectorize(function(x, y, z) {
    return x + y + z;
});

_.map([f, g, h], function(fun) {
    console.log(fun.call(null, [1,1], [3,0], [1,-1], [0,2]));
});
// => [0, 10]
// => [18, 8]
// => [5, 0]

var v = Vect.create(1, 2, 3);
var w = Vect.create(1, 1, 1);
console.log(Vect.add(v, w)); // => [2, 3, 4]
console.log(Vect.subtract(v, w)); // => [0, 1, 2]
console.log(Vect.scale(2, v)); // => [2, 4, 6]
