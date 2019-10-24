// inject pie chart into the DOM
// accepts:
    // data to graph
    // array
    // total commits ????? tentative
// returns:
    // void
function pie(target, input) {

    var data = {
        labels: [],
        series: []
    };

    // parse data
    input.forEach(e => {
        // get commit percentages per contributor
        data.series.push(e['commits']);
        data.labels.push(e['email']);
    });

    var options = {
        labelInterpolationFnc: function (value) {
            return value[0]
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function (value, idx) {
                return value + ': ' + data.series[idx] + ' commits';
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];


    // add chart div to DOM
    $(target).append('<div class="ct-chart ct-perfect-fourth"></div>');
    // init chart with data
    new Chartist.Pie('.ct-chart', data, options, responsiveOptions);

}