// send AJAX request for top committers of a repo
// adds API data to DOM
// accepts:
    // url: API root url
    // id: repo DOM ID
// returns:
    // void
function topCommitters(url, id) {
    console.log(id);

    // parse repo DOM ID
    let idArray = id.split('-');
    // get repo ID
    let repoID = idArray[0].substring(1);
    // get total commits
    let commits = idArray[1];

    console.log(repoID);
    console.log(`commits: ${commits}`);

    $.ajax({
        url: `${url}${repoID}/top-committers/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
        // graph data
        pie(id, data);
    });
}