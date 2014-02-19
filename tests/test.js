require([
    'jasmine',
    'jasmine-html',
    'jquery'],
function (jasmine, jasmineHtml, $) {
    // Test!
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    // Copy jasmine globals
    ['spyOn', 'waitsFor', 'waits', 'runs', 'expect'].forEach(function (key) {
        window[key] = function () {
            var spec = jasmine.getEnv().currentSpec;
            return spec[key].apply(spec, arguments);
        };
    });
    ['beforeEach', 'afterEach', 'describe', 'it'].forEach(function (key) {
        window[key] = jasmineEnv[key].bind(jasmineEnv);
    });

    var specs = [];
    specs.push('tests/spec/metric');
    specs.push('tests/spec/views/metric-list-view');

    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});