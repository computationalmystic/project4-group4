
// scrape.js
    // driver script
    // handles event listeners and callback delegation

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

        // get repo group ID
        let repoGroup = event.currentTarget.className.split(' ')[1];
        
        // format repo button ID for jquery
        let target = `#${event.currentTarget.id}`;

        // toggle active class
        $(target).toggleClass('active').promise().done(() => {
            // check if the corresponding stat panel should be open
            if ($(target).hasClass('active')) {
                // open stat panel for repo clicked
                let panelID = `${target}-panel`;
                $(panelID).slideDown({ easing: 'swing' });      
                
                // check if data has been fetched yet
                if (!$(panelID).hasClass('generated')) {
                    // generate stats
                    topCommitters(`${root}${repoGroup}/repos/`, target);
                    codeChanges(`${root}${repoGroup}/repos/`, target);
                    rate(`${root}${repoGroup}/repos/`, target);

                    // prevent further AJAX calls
                    $(panelID).addClass('generated');
                }
            } else {
                // close stat panel
                $(`${target}-panel`).slideUp({ easing: 'swing' });
            }
        });
    });

});
