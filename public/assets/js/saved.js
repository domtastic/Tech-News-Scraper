$(document).on("click", '#deleteSaved', function (event) {
    event.preventDefault()
    const articleId = $(this).attr('data-articleid');
    console.log(articleId);


    $.get(`/delete/${articleId}`).then(function (res) {
        console.log(res);
        location.reload();

    })
});