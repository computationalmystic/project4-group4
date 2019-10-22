// scrape.js
// avery wald

$(document).ready(() => {

    // send base GET request to augur REST API
    $.ajax({
        dataType: 'json',
        url: 'http://augur.osshealth.io:5000/api/unstable/repo-groups',
        method: 'GET',
    }).done((data) => {
        
        // iterate through the objects in JSON response
        $.each(data, (key, first) => {
            $.ajax({
                dataType: 'json',
                url: 'http://augur.osshealth.io:5000/api/unstable/repo-groups/'+first['repo_group_id']+'/code-changes',
                method: 'GET',
            }).done((data) => {
        
                // iterate through the objects in JSON response
                $.each(data, (key, second) => {
                    $.ajax({
                        dataType: 'json',
                        url: 'http://augur.osshealth.io:5000/api/unstable/repo-groups/'+first['repo_group_id']+'/repos/'+second['repo_id']+'/top-committers',
                        method: 'GET',
                    }).done((data) => {
                        console.log(data);
                        setupChart(data);
                        // // iterate through the objects in JSON response
                        // $.each(data, (key, third) => {
                        //     console.log('Commit: ' + third['email'] + third['commits'])
                        // });
                
                    });
                    
                });
            });
        });

// inject pie chart into the DOM
// accepts:
    // data to graph
        // array
    // total commits ????? tentative
// returns:
    // void
function pie(input, total) {
    
    //var total = 0;
    var data = {
        labels: [],
        series: []
    };

    // parse data
    input.forEach(e => {
        data.series.push((e['commits'] / total) * 100);
        data.labels.push(e['email']);
    });

    var options = {
        labelInterpolationFnc: function(value) {
            return value[0]
        } 
    }

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value, idx) {
            console.log(total);
            console.log('value: '+ value + ' idx: '+idx + ' series[idx]: ' + data.series[idx]);

            //var percentage = Math.round(data.series[idx] / total * 100) + '%';
            return data.labels[idx] + ' ' + data.series[idx] + '%';
        }
        }],
        ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
        }]
    ];

    // add chart div to DOM
    $('body').append('<div class="ct-chart ct-perfect-fourth"></div>');
    // init chart with data
    new Chartist.Pie('.ct-chart', data, options, responsiveOptions);

}

    function setupChart(dataIn){
        if (typeof dataIn !== 'undefined'){
            var margin = {top: 20, right: 20, bottom: 70, left: 40},
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

            // set the ranges
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
            var y = d3.scale.linear().range([height, 0]);

            // define the axis
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

            // add the SVG element
            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");
                
            // load the data
            d3.json(dataIn, function(error, data) {
                if (typeof data !== 'undefined'){

                data.forEach(function(d) {
                    d.email = d.email;
                    d.commits = +d.commits;
                });
                }
            // scale the range of the data
            x.domain(data.map(function(d) { return d.email; }));
            y.domain([0, d3.max(data, function(d) { return d.commits })]);

                $.when(request(response.data[i].url, endpoints[4])).done((response) => {
                     console.log(response.data);
                    // pie chart of top committers' contributions
                    pie(response.data, commits);
                });
            });
        }
    }

});
