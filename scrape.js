
// scrape.js
// avery wald

// API stuff
let root = 'http://augur.osshealth.io:5000/api/unstable/repo-groups/';
let endpoints = [
    { criteria: 'repo_group_id', extension: '/repos/' },
    { criteria: 'repo_id', extension: '/code-changes/' },
    { criteria: 'repo_id', extension: '/top-committers/' },
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

// once page is loaded
$(document).ready(() => {

    const i = 1;

        // API root GET request
        $.when(request(root, endpoints[0])).done((response) => {
            console.log(response);

            $.when(request(response.data[i].url, endpoints[1])).done((response) => {
                console.log(response);
            });
            $.when(request(response.data[i].url, endpoints[2])).done((response) => {
                console.log(response);

                $.when(request(response.data[i].url, endpoints[3])).done((response) => {
                    console.log(response);
                });
            });
        });

});
