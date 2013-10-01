define(function () {

    var Metric = function (opts) {
        this._label = opts.label;
        this._value = opts.value;
    };

    Metric.prototype.getValue = function () {
        return this._value;
    };

    Metric.prototype.getLabel = function () {
        return this._label;
    };

    return Metric;
});