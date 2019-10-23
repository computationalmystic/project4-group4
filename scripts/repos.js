// recieve AJAX response with repos belonging to the group selected
function getRepos(url, id) {
    $.ajax({
        url: `${url}${id}/repos/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
        data.forEach(e => {
            $('#dynamic').append(repoDOM(e.repo_name, e.repo_id));
        });
    });
}

// formatted HTML partial for DOM insertion
function repoDOM(content, id) {
    return `<button id="${id}" class="r-button">${content}</button>`;
}