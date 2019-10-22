// scrape.js
// avery wald

// API stuff
let root = 'http://augur.osshealth.io:5000/api/unstable/repo-groups/';
let endpoints = [
    { criteria: 'repo_group_id', extension: '/repos/' },
    { criteria: 'repo_id', extension: '/code-changes/' },
    { criteria: 'repo_id', extension: '/top-committers/' },
    { criteria: 'repo_id', extension: '/pull-request-acceptance-rate/' },
    { criteria: '', extension: '' }
];

// send AJAX GET request
// accepts:
    // url to send GET request to
    // index of endpoint criteria to parse for
// returns:
    // GET response with updated URL for the next request down the pipe
function request(url, index) {
    // initialize object container
    var obj = new Object();
    // GET request
    $.ajax({
        url: url,
        dataType: 'json',
        async: false
    }).done((data) => {
        // assign GET response data to object field
        obj.data = data;
        // parse GET response entry objects
        $.each(data, (k) => {
            // append new field to each containing updated URL 
            data[k].url = url 
                + data[k][index.criteria] 
                + index.extension;
        });
    });
    return obj;
}

// inject pie chart into the DOM
// accepts:
    // data to graph
        // array
    // total commits ????? tentative
// returns:
    // void

function pie(input, total) {

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
        labelInterpolationFnc: function(value) {
          return value[0]
        }
      };

      var responsiveOptions = [
        ['screen and (min-width: 640px)', {
          chartPadding: 30,
          labelOffset: 100,
          labelDirection: 'explode',
          labelInterpolationFnc: function(value, idx) {
            return value + ': ' + data.series[idx] + ' commits';
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

// once page is loaded
$(document).ready(() => {

    var i = 0;
    var commits = 0;

        // API root GET request
        $.when(request(root, endpoints[0])).done((response) => {
            // console.log(response.data);

            $.when(request(response.data[i].url, endpoints[1])).done((response) => {
                // console.log(response.data);

                i = 3;

                $.when(request(response.data[i].url, endpoints[4])).done((response) => {
                    console.log('code changes: ', response.data);           
                    
                    // get total commits per repo
                    let arr = response.data;
                    arr.forEach(element => {
                        commits += element['commit_count'];
                    });
                    console.log('total commits: ', commits);
                    
                });
            });
            $.when(request(response.data[i].url, endpoints[2])).done((response) => {
                // console.log(response.data);            

                $.when(request(response.data[i].url, endpoints[4])).done((response) => {
                     console.log(response.data);

                    // pie chart of top committers' contributions
                    pie(response.data, commits);
                });
            });
        });

});
