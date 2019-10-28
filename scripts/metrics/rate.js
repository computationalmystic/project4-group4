// send AJAX request for pull request acceptance rate of a repo
// adds API data to DOM
// accepts:
    // url: API root url
    // id: repo DOM ID
// returns:
    // void
function rate(url, id) {
    console.log(id);

    // parse repo DOM ID
    let idArray = id.split('-');
    // get repo ID
    let repoID = idArray[0].substring(1);

    $.ajax({
        url: `${url}${repoID}/pull-request-acceptance-rate/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
    });
}