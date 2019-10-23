
// scrape.js
// avery wald

// API stuff
const root = 'http://augur.osshealth.io:5000/api/unstable/repo-groups/';

// repo group HTML partial for DOM insertion
function partial(content, id, c) {
    return `<button id="${id}" class="${c}">${content}</button>`;
}

// once page is loaded
$(document).ready(() => {

    // complete root API request
    $.when($.ajax(root)).done((data, textStatus, xhr) => {
        // if AJAX responds successfully
        if (textStatus == 'success') {
            data.forEach(e => {
                // add repo group buttons to DOM
                $('#rg').append(partial(e.rg_name, e.repo_group_id, 'rg-button'));
            });
        } else {
            // log AJAX error response
            console.log(xhr);
        }     
    });

    // when repo group clicked
    $(document).on('click', '.rg-button', (event) => {
        // check if there's already content
        if ($('#dynamic').has('button')) {
            // purge content
            $('#dynamic').empty();
        } 
        // populate DOM with repos
        getRepos(root, event.currentTarget.id);  
    });

});
