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
        
    vect.matrix = function(m) {
        return function(v) {
            return vect.lcom.apply(null, v).apply(null, m);
        };
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

var m = Vect.matrix([[1, 3], [2, 4]]);
var x = [-1, 2];
console.log(m(x)); // => [3, 5]

var n = Vect.matrix([[1, 2, 3], [4, 5, 6]]);
var nm = _.compose(n, m);
console.log(nm(x)); // => [23, 31, 39]
console.log(n(m(x))); // => [23, 31, 39]

// Coefficients of nm
console.log(nm([1,0])); // => [13, 17, 21]
console.log(nm([0,1])); // => [18, 24, 30]
