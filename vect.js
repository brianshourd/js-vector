var Vect = (function() {
    var vect = {};

    var sum = function() {
        var list = _.toArray(arguments);
        return _.reduce(list, function(sum, current) {
            return sum + current;
        }, 0);
    };

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
    };

    vect.lcom = function() {
        var coeffs = _.toArray(arguments);
        return vect.vectorize(function() {
            var inputs = _.toArray(arguments);
            return sum.apply(null, _.map(_.zip(coeffs, inputs), function(pair) {
                return pair[0] * pair[1]; // coeff * input
            }));
        });
    };
        

    vect.add = vect.vectorize(sum);

    vect.subtract = vect.vectorize(function(v, w) {
        return v - w;
    });

    vect.scale = function(a, v) {
        return vect.vectorize(function(v) { return a * v; })(v);
    };

    return vect;
}());

var f = Vect.lcom(1, 2, -7, 1);
var g = Vect.lcom(1, 4, 5, 6);
var h = Vect.lcom(1, 1, 1);

_.map([f, g], function(fun) {
    console.log(fun.call(null, [1,1], [3,0], [1,-1], [0,2]));
});
console.log(h([1,1], [3,0], [1,-1]));
// => [0, 10]
// => [18, 8]
// => [5, 0]

var v = Vect.create(1, 2, 3);
var w = Vect.create(1, 1, 1);
var z = Vect.create(0, 0, 1);
console.log(Vect.add(v, w)); // => [2, 3, 4]
console.log(Vect.subtract(v, w)); // => [0, 1, 2]
console.log(Vect.scale(2, v)); // => [2, 4, 6]
console.log(Vect.add(v, w, z)); // => [2, 3, 5]
