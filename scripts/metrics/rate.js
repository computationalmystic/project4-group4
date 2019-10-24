function commitRate(url, id) {
    $.ajax({
        url: `${url}${id}/pull-request-acceptance-rate/`,
        dataType: 'json'
    }).done(data => {
        console.log(data);
    });
}