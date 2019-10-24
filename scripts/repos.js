
// repos.js
// avery wald

// recieve AJAX response with repos belonging to the group selected
function getRepos(url, id) {
    $.ajax({
        url: `${url}${id}/repos/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
        data.forEach(e => {
            $('#dynamic').append(
                partial(
                    e.repo_name, 
                    e.repo_id, 
                    `r-button ${id}`,
                    true
                )
            );
        });
    });
}

function repoData(url, id) {
    $.ajax({
        url: `${url}${id}`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
    });
}