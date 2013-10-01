define([
    'streamhub-sdk/view',
    'inherits',
    'hgn!streamhub-metrics/templates/metric'],
function (View, inherits, SimpleMetricTemplate) {

    var MetricView = function (opts) {
        opts = opts || {};
        this.metric = opts.metric;
        View.apply(this, opts);
    };

    inherits(MetricView, View);

    MetricView.prototype.elClass = 'hub-metric';

    MetricView.prototype.template = SimpleMetricTemplate;

    MetricView.prototype.setElement = function (element) {
        View.prototype.setElement.apply(this, arguments);
        this.$el.addClass(this.elClass);

        var self = this;
        this.$el.on('click', function () {
            self.$el.trigger('focusMetric.hub', {
                metric: self.metric,
                view: self
            });
        });
    };

    MetricView.prototype.render = function () {
        if (typeof this.template === 'function') {
            this.$el.html(this.template(this.metric));
        }
    };

    return MetricView;
});