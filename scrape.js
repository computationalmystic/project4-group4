
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
        $.each(data, (key, value) => {

            // log the data for dev purposes
            console.log(key, value['rg_name']);

            // add data point group to DOM
            $('body').append(
                `<div id="${key}" class="dataPoint">
                    <h3>${value['rg_name']}</h3>
                </div>`
            );

        });

    });

});
