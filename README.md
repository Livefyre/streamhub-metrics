# streamhub-metrics

streamhub-metrics provides reusable modules for modeling and visualizing metrics from Livefyre StreamHub. For example, a horizontal bar graph showing the Hottest (trending) Collections in a StreamHub Collection.

![Example Hot Collections Widget](http://i.imgur.com/I8oOcO2.png)

This repository only provides an interface for Metric objects and reusable Views to visualize them. Specific metrics can be found in other repositories, like [streamhub-hot-collections](https://github.com/gobengo/streamhub-hot-collections).

## Usage

### Metric
`streamhub-metrics/metric`

A metric is only required to have two methods:

* `getValue()` - Get a Number value for the metric
* `getLabel()` - Get a String to label the value

Example construction:

    var Metric = require('streamhub-metrics/metric');
    
    var myMetric = new Metric({
        value: 13,
        label: 'My Metric'
    });

### MetricViews
`streamhub-metrics/views/metric-view`

MetricViews are implementations of `streamhub-sdk/view` that can visualize a Metric.

    var MetricView = require('streamhub-metrics/views/metric-view');
    
    var myMetricView = new MetricView({
        el: document.getElementById('metricView'),
        metric: myMetric
    });

#### HorizontalBarView
`streamhub-metrics/views/horizontal-bar-view`

A MetricView that shows the metric as a horizontal bar, compared to another value.

![A HorizontalBarView](http://i.imgur.com/3ouTNk5.png)

HorizontalBarViews have an additional method, `getCompareTo()` that should return the maximum value of the horizontal bar.

### MetricListView
`streamhub-metrics/views/metric-list-view`

MetricListViews are implementations of `streamhub-sdk/views/list-view` that visualize a list of Metrics.

    var MetricListView = require('streamhub-metrics/views/metric-list-view');
    
    var myMetricListView = new MetricListView({
        el: document.getElementById('myMetricListView')
    });

You can `.add()` a Metric to a MetricListView, and a MetricView will be created for the metric, and it will be added to the list in sorted order. By default, MetricListView will create a `streamhub-metrics/views/horizontal-bar-view` for each Metric.

    myMetricListView.add(myMetric);

## Local Development

Instead of using a built version of streamhub-wall from Livefyre's CDN, you may wish to fork, develop on the repo locally, or include it in your existing JavaScript application.

Clone this repo

    git clone https://github.com/Livefyre/streamhub-metrics

Development dependencies are managed by [npm](https://github.com/isaacs/npm), which you should install first.

With npm installed, install streamhub-wall's dependencies. This will also download [Bower](https://github.com/bower/bower) and use it to install browser dependencies.

    cd streamhub-metrics
    npm install

This repository's package.json includes a helpful script to launch a web server for development

    npm start

You can now visit [http://localhost:8080/examples/main](http://localhost:8080/examples/main) to see an example wall loaded via RequireJS.

# StreamHub

[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is used by the world's biggest brands and publishers to power their online Content Communities. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. Want StreamHub? [Contact Livefyre](http://www.livefyre.com/contact/).
