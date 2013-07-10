var Vect = (function() {
    var vect = {};

    vect.vectorize = function(fun) {
        return function() {
            var args = _.toArray(arguments);
            return _.map([0, 1], function(index) {
                return fun.apply(null, _.map(args, function(ary) {
                    return ary[index];
                }));
            });
        };
    }

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
