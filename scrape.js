
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
        let dataPoints = [];
        $.each(data, (key, value) => {
            console.log(key, value['rg_name']);
            // add data as a list item element into array
            dataPoints.push(`<li id="${key}">${value['rg_name']}</li>`);
        });
        // add to DOM in a list element
        $('<ul>', {
            'class': 'getResponse',
            html: dataPoints.join('')
        }).appendTo('body');
    });

});
