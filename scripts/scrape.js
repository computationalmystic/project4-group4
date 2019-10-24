
// scrape.js
// avery wald

// API stuff
const root = 'http://augur.osshealth.io:5000/api/unstable/repo-groups/';

// repo group HTML partial for DOM insertion
function partial(content, id, c, repo = false) {
    if (repo) {
        return `<button id="${id}" class="${c}">${content}</button>
                <div id="${id}-panel" class="stat-panel"></div>`;
    } else {
        return `<button id="${id}" class="${c}">${content}</button>`;
    }
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
    $(document).on('click', '.rg-button', event => {
        // check if there's already content
        if ($('#dynamic').has('button')) {
            // purge content
            $('#dynamic').empty();
        } 
        // populate DOM with repos
        getRepos(root, event.currentTarget.id);  
    });

    // when repo clicked
    $(document).on('click', '.r-button', event => {
        let target = `#${event.currentTarget.id}`;
        $(target).toggleClass('active').promise().done(() => {
            if ($(target).hasClass('active')) {
                // open stat panel
                $(`${target}-panel`).slideDown({ easing: 'swing' });
                // generate stats ??
                    // set state as generated to prevent further ajax calls
            } else {
                // close stat panel
                $(`${target}-panel`).slideUp({ easing: 'swing' });
            }
        });
    });

});
