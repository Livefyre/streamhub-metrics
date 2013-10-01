define([
    'inherits',
    'streamhub-trending/hot-collections/clients/hot-collections-client',
    'json!./hot-collections-response.json'],
function (inherits, HotCollectionsClient, mockHotCollectionsResponse) {

    var MockHotCollectionsClient = function () {
        HotCollectionsClient.apply(this, arguments);
    };

    inherits(MockHotCollectionsClient, HotCollectionsClient);

    MockHotCollectionsClient.prototype._get = function (url, params, errback) {
        errback(null, mockHotCollectionsResponse);
    };

    MockHotCollectionsClient.mockResponse = mockHotCollectionsResponse;
    return MockHotCollectionsClient;
});