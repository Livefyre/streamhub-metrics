define([
    'streamhub-sdk/jquery',
    'inherits',
    'streamhub-sdk/views/list-view',
    'streamhub-metrics/views/horizontal-bar-view'],
function ($, inherits, ListView, HorizontalBarView) {

    var MetricListView = function (opts) {
        this._maxValue = 0;
        ListView.call(this, opts);
    };

    inherits(MetricListView, ListView);

    MetricListView.prototype.elClass += ' hub-metric-list';

    MetricListView.prototype.comparator = function (a, b) {
        return b.metric.getValue() - a.metric.getValue();
    };

    MetricListView.prototype.add = function (metric) {
        var value = metric.getValue(),
            barView = this._createMetricView(metric);

        if (value > this._maxValue) {
            this._setMaxValue(value);
        }
        ListView.prototype.add.call(this, barView);
    };

    MetricListView.prototype._createMetricView = function (metric) {
        var self = this;

        var barView = new HorizontalBarView({
            metric: metric,
            compareTo: this._maxValue
        });

        // Compare the bar to the max value on this MetricListView
        barView.getCompareTo = function () {
            return self._maxValue;
        }
        this.on('change:maxValue', function (newMaxValue) {
            barView.setCompareTo(newMaxValue);
        });
        return barView;
    };

    MetricListView.prototype._setMaxValue = function (value) {
        this._maxValue = value;
        this.emit('change:maxValue', value);
    };

    return MetricListView;
});
