define([
    'jasmine',
    'streamhub-metrics/views/metric-list-view'],
function (jasmine, MetricListView) {
    describe('streamhub-metrics/views/metric-list-view', function () {
        it('can be constructed with no options', function () {
            var view = new MetricListView();
            expect(view instanceof MetricListView).toBe(true);
        });
    }); 
});
