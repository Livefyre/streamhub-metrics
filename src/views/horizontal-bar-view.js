define([
    'streamhub-metrics/views/metric-view',
    'inherits',
    'hgn!streamhub-metrics/templates/horizontal-bar'],
function (MetricView, inherits, HorizontalBarTemplate) {

    var HorizontalBarView = function (opts) {
        MetricView.apply(this, arguments);
        this.render();
        if (opts.compareTo) {
            this.setCompareTo(opts.compareTo);
        }
    };

    inherits(HorizontalBarView, MetricView);

    HorizontalBarView.prototype.template = HorizontalBarTemplate;
    HorizontalBarView.prototype.barElSelector = ".hub-metric-bar";

    HorizontalBarView.prototype._wobble = function (opts) {
        var self = this;
        clearTimeout(self._wobbleTimeout);
        if (opts === false) {
            return;
        }
        if (typeof opts !== 'object') {
            opts = {};
        }
        var maxMultiplier = opts.maxMultiplier || .05;
        var interval = opts.interval || 1000;
        var $bar = this.$el.find(this.barElSelector);
        this._wobbleTimeout = setTimeout(function randomize() {
            var value = self.metric.getValue(),
                sign = (Math.random() - 0.5) > 0 ? 1 : -1,
                multiplier = Math.random() * maxMultiplier,
                wobbledValue = value * ( 1 + (sign * multiplier));
            self._setBarWidth(wobbledValue);
            self._wobbleTimeout = setTimeout(randomize, interval);
        }, interval);
    };

    HorizontalBarView.prototype.setCompareTo = function (value) {
        this._compareTo = value;
        this._setBarWidth();
    };

    HorizontalBarView.prototype.getCompareTo = function () {
        return this._compareTo;
    };

    HorizontalBarView.prototype._setBarWidth = function (value, compareTo) {
        var $bar = this.$el.find(this.barElSelector);
        value = value || this.metric.getValue();
        compareTo = compareTo || this.getCompareTo();
        $bar.width(100 * (value / compareTo) + '%');
    };

    return HorizontalBarView;
});