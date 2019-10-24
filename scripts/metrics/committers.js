function topCommitters(url, id) {
    $.ajax({
        url: `${url}${id}/top-committers/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
    });
}