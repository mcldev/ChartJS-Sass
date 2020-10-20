# ChartJS-Sass
SASS and JS library to integrate Chart.js with CSS.

## Updates
- The current version only works for Chart.Js version 2.x
- For Chart.Js version 1.x use the Git tagged version of ChartJs-SASS v1.0.0

## Requires
1. JQuery (any compatible version with ChartJS) [link](http://jquery.com/)
2. Chart.js [link](http://www.chartjs.org/)

## Implementation
1. Download ChartJS-Sass as zip and extract to your project.
2. Create a chart.js using the `<canvas>` object, see example format here: [link](http://www.chartjs.org/docs/#line-chart-example-usage)
3. Include jQuery, Chart.js and chartjs-sass javascript and stylesheets at the top of your document, i.e. above your script calls to build the charts. 
e.g. add the following to the `<head>` section of your page
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
    <script src="/js/chartjs-sass.js"></script>
    
    <link rel="stylesheet" href="/css/chartjs-sass-default.css">
    ```
3. Parse the Chart.js data before creating the chart, this will retrieve each color for each dataset and inject into the data object. (see [API below](## Mixin chart_colors API))
    ```js
    //No colors are required to be specified in the js (as it should be!!)
    var data = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };
    
    //Get context object 
    var ctx = document.getElementById("myChart").getContext("2d");
    
    // *** Parse the data to add colors from CSS here ***
    data = parse_css_colors("myChart", CHART_TYPES.LINE, data); 
    
    //Create Chart
    var myChart = new Chart(ctx).Line(data);
    ```
    
## Customisation
1. Use Sass to modify/create your own custom chart formats.
2. Import `chartjs-sass.scss` into your custom scss file. e.g.
    ```
    @import 'chartjs-sass';
    ```
    
3. Create chart specific formatting by including a parent selector, or formatting for all charts without.

    **Create formatting for a specific chart only**
    ```
    #myTestChart {
        @include chart_colors((pink, red, blue, yellow, orange));
    }
    ```

    **Create default formatting for all charts**

    ```
    @include chart_colors((orange, pink, red));
    ```

4. Include your custom css file into your head file, *after* the default stylesheet, e.g.
   ```html
   <link rel="stylesheet" href="/css/chartjs-sass-default.css">
   <link rel="stylesheet" href="/css/my-custom-chart-formats.css">
   ```

## Mixin chart_colors API
There are two optional inputs to the `chart_colors` sass mixin:
    ```
    @mixin chart_colors($base_colors:null, $num_required:null)
    ```
    
1. $base_colors
    * Allowed values: `null`, a single color, or array of colors (sass understands singletons as 1 length arrays)
    * These will map in the same order to the data provided, i.e. Dataseries_1 => Color_1 etc.
2. $num_required
    * Allowed values: `null`, or a positive integer 
    * If missing or null, it will create only the formatting for the provided `$base_colors`
    * If provided, it will create formatting for each dataseries up the number required. If the number required is greater than the number of `$base_colors` provided then it will use random colors.
3. Output
    * Will use each of the base colors (or random colors) to create formatting for each type of chart.
    * To keep things simple, it creates a slightly bloated CSS with formatting for each chart type.
4. Parsing CSS - parse_css_colors()
    * `parse_css_colors()` will parse each provided dataset and add the colors defined in the css.
    * Simply put, it will assign the class for each series to an object in the dom then retrieve the color based on that.

**Sample output:**

    ```
    .line.backgroundColor_1,
    .scatter.backgroundColor_1,
    .radar.backgroundColor_1 {
      color: rgba(151, 187, 205, 0.3); }
    .line.borderColor_1,
    .scatter.borderColor_1,
    .radar.borderColor_1 {
      color: #97bbcd; }
    .line.pointBackgroundColor_1,
    .scatter.pointBackgroundColor_1,
    .radar.pointBackgroundColor_1 {
      color: #97bbcd; }
    .line.pointBorderColor_1,
    .scatter.pointBorderColor_1,
    .radar.pointBorderColor_1 {
      color: #97bbcd; }
    .line.hoverBackgroundColor_1,
    .scatter.hoverBackgroundColor_1,
    .radar.hoverBackgroundColor_1 {
      color: #528eac; }
    ```
 
