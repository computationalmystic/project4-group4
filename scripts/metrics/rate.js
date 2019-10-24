// send AJAX request for pull request acceptance rate of a repo
// adds API data to DOM
// accepts:
    // url: API root url
    // id: repo DOM ID
// returns:
    // void
function rate(url, id) {
    $.ajax({
        url: `${url}${id}/pull-request-acceptance-rate/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
    });
}