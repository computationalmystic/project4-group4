
// scrape.js
// avery wald

// API stuff
let root = 'http://augur.osshealth.io:5000/api/unstable/repo-groups/';
let endpoints = [
    { criteria: 'repo_group_id', extension: '/repos/' },
    { criteria: 'repo_id', extension: '/code-changes/' },
    { criteria: 'repo_id', extension: '/top-committers/' }
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

// once page is loaded
$(document).ready(() => {

        // API root GET request
        $.when(request(root, endpoints[0])).done((response) => {

            // ready to request repos
            console.log(response);

            // request code changes and repos
                // double when
            $.when(request(response.data[0].url, endpoints[1])).done((response) => {

                console.log(response);

                $.when(request(response.data[0].url, endpoints[2])).done((response) => {

                    console.log(response);



                });

            });
            
        });

});
