
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
                        url: 'http://augur.osshealth.io:5000/api/unstable/repo-groups/'+first['repo_group_id']+'/repos/'+second['repo_id']+'/committers',
                        method: 'GET',
                    }).done((data) => {
                
                        // iterate through the objects in JSON response
                        $.each(data, (key, third) => {
                            console.log('Commit: ' + third['count'])
                        });
                
                    });
                    
                });
            });
        });

    });

});
