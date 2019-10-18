
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

// function domify(data) {
//     for (let item in data) {
//         $('body').append(`<h3>${item}</h3>`);
//     }
// }

// once page is loaded
$(document).ready(() => {

    var i = 0;
    var commits = 0;

        // API root GET request
        $.when(request(root, endpoints[0])).done((response) => {
            // console.log(response.data);
            // domify(response.data);

            $.when(request(response.data[i].url, endpoints[1])).done((response) => {
                // console.log(response.data);

                $.when(request(response.data[i].url, endpoints[3])).done((response) => {
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

                $.when(request(response.data[i].url, endpoints[3])).done((response) => {
                    // console.log(response.data);

                    // get the top committers and their percentage of total commits
                    let arr = response.data;
                    arr.forEach(e => {
                        let str = 
                            'commit pctg: ' +
                            e['email'] + ' ' +
                            'commits: ' +
                            e['commits'] + ' ' +
                            (e['commits'] / commits);
                        $('body').append(`<h3>${str}</h3>`);
                    });
                    // domify(response.data);
                });
            });
        });

});
