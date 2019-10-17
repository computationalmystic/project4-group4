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

    });

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

            // add axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-90)" );

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 5)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");


            // Add bar chart
            svg.selectAll("bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.email); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.commits); })
                .attr("height", function(d) { return height - y(d.commits)});
                

            });
        }
    }

});
