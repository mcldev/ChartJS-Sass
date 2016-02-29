# ChartJS-Sass
SASS and JS library to integrate Chart.js with CSS.

## Requires
1. JQuery (any compatible version with ChartJS) [link](http://jquery.com/)
2. Chart.js [link](http://www.chartjs.org/)

## Implementation
1. Download ChartJS-Sass as zip and extract to your project.
2. Create a chart.js using the `<canvas>` object, see example format here: [link](http://www.chartjs.org/docs/#line-chart-example-usage)
3. Include jQuery, Chart.js and chartjs-sass javascript and stylesheets at the top of your document, i.e. above your script calls to build the charts. 
e.g. add the following to the `<head>` section of your page
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
    <script src="/js/chartjs-sass.js"></script>
    
    <link rel="stylesheet" href="/css/chartjs-sass-default.css">
    ```
3. Parse the Chart.js data before creating the chart, this will retrieve each color for each dataset and inject into the data object.
    ```javascript
    var ctx = document.getElementById("myChart").getContext("2d");
    `* data = parse_css_colors("myChart", CHART_TYPES.LINE, data); * `
    var myChart = new Chart(ctx).Line(data, options);
    ```
    
## Customisation
1. Use Sass to modify/create your own custom chart formats.
2. Import `chartjs-sass.scss` into your custom scss file. e.g.
    ```sass
    @import 'chartjs-sass';
    ```
3. Create chart specific formatting by including a parent selector, or formatting for all charts without.
    *Create formatting for a specific chart only*
    ```sass
    #myTestChart {
        @include chart_colors((pink, red, blue, yellow, orange));
    }
    ```
    *Create default formatting for all charts*
    ```sass
    @include chart_colors((orange, pink, red));
    ```
4. Include your custom css file into your head file, *after* the default stylesheet, e.g.
   ```html
   <link rel="stylesheet" href="/css/chartjs-sass-default.css">
   <link rel="stylesheet" href="/css/my-custom-chart-formats.css">
   ```