define([
    'inherits',
    'streamhub-trending/hot-collections/streams/hot-collections',
    'streamhub-trending-tests/mocks/hot-collections/clients/mock-hot-collections-client'],
function (inherits, HotCollections, MockHotCollectionsClient) {

    var MockHotCollections = function (opts) {
        opts = opts || {};
        opts.client = opts.client || new MockHotCollectionsClient();
        HotCollections.call(this, opts);
    };

    inherits(MockHotCollections, HotCollections);

    return MockHotCollections;
});