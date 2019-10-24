function codeChanges(url, id) {
    $.ajax({
        url: `${url}${id}/code-changes/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
    });
}