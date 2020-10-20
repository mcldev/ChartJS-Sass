/**
 * Created by Michael on 25-Feb-16.
 */

//Chart Color Types
CHART_TYPES = {
    LINE: 'line',
    BAR: 'bar',
    HORIZONTAL_BAR: 'horizontalBar',
    RADAR: 'radar',
    POLAR: 'polarArea',
    PIE: 'pie',
    DOUGHNUT: 'doughnut',
    BUBBLE: 'bubble',
    SCATTER: 'scatter',
};

DATASET_TYPE = {
    DATASET: 'dataset',
    DATA: 'data'
};

function get_color_types(chart_type) {
    switch (chart_type) {
        case CHART_TYPES.LINE:
        case CHART_TYPES.SCATTER:
        case CHART_TYPES.RADAR:
            return ['backgroundColor', 'borderColor', 'hoverBackgroundColor', 'hoverBorderColor',
                'pointBackgroundColor', 'pointBorderColor', 'pointHoverBackgroundColor', 'pointHoverBorderColor']
        case CHART_TYPES.BAR:
        case CHART_TYPES.HORIZONTAL_BAR:
        case CHART_TYPES.PIE:
        case CHART_TYPES.DOUGHNUT:
        case CHART_TYPES.POLAR:
        case CHART_TYPES.BUBBLE:
            return ['backgroundColor', 'borderColor', 'hoverBackgroundColor', 'hoverBorderColor',];

    }
}

function get_dataset_type(chart_type) {
    switch (chart_type) {
        case CHART_TYPES.LINE:
        case CHART_TYPES.RADAR:
        case CHART_TYPES.BAR:
            return DATASET_TYPE.DATASET;
            break;
        case CHART_TYPES.PIE:
        case CHART_TYPES.POLAR:
        case CHART_TYPES.DOUGHNUT:
            return DATASET_TYPE.DATA;
            break;
    }
}

//Parse the Data and return colors
function parse_css_colors(chart_id, chart_type, chart_data) {

    //Parse if string, otherwise assume a json data object
    var dataIsString = (typeof (chart_data) == 'string');
    chart_data = dataIsString ? JSON.parse(chart_data) : chart_data;

    //Get Chart Canvas Id, i.e. canvas.#chart_id
    chart_selector = String(chart_id).startsWith('#') ? chart_id : '#' + chart_id;
    chart_selector = 'canvas' + chart_selector;

    //Get Color Types for this chart type
    var chart_color_types = get_color_types(chart_type);

    //Clear inline color on existing canvas object
    $(chart_selector).css('color', '');

    //Get datasets - may need to create a switch in future if more data structures are used in ChartJS
    var dataset_type = get_dataset_type(chart_type);
    var theDatasets = chart_data.data.datasets;

    //For each dataset
    $.each(theDatasets, function (dataset_idx, dataset) {

        //Set the classes for each '[chart_type] [color_type]_[idx]'
        $.each(chart_color_types, function (idx, theColorType) {
            if(theColorType in dataset) return; //continue if color already set

            var theClass = chart_type + ' ' + theColorType + '_' + (dataset_idx + 1);
            var theColor = null;

            //Add the Class, get the computed colors, then remove the class
            var tempClass = $(chart_selector).attr('class');
            $(chart_selector)
                .addClass(theClass)
                .removeClass(function (idx) {
                    theColor = $(this).css('color');
                    return theClass;
                });
            $(chart_selector).attr('class', tempClass);

            //Add/change the computed color to the data
            dataset[theColorType] = theColor;

        });

    });

    //If the data was orginally a string - then return as one
    return dataIsString ? JSON.stringify(chart_data) : chart_data;

}

//Fix for IE not having the startsWith Function.
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
