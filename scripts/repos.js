
// repos.js
// avery wald

// recieve AJAX response with repos belonging to the group selected
function getRepos(url, id) {
    $.ajax({
        url: `${url}${id}/repos/`,
        dataType: 'json'
    }).done(data => {
        data.forEach(e => {
            $('#dynamic').append(
                partial(
                    e.repo_name, 
                    `${e.repo_id}-${e.commits_all_time}`, 
                    `r-button ${id}`,
                    true
                )
            );
        });
    });
}