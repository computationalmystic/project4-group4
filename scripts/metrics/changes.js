// send AJAX request for code changes in a repo
// adds API data to DOM
// accepts:
    // url: API root url
    // id: repo DOM ID
// returns:
    // void
function codeChanges(url, id) {
    $.ajax({
        url: `${url}${id}/code-changes/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);

        // add to DOM
    });
}