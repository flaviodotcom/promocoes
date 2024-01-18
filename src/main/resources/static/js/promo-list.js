let pageNumber = 0;

$(window).scroll(() => {
    let scrollTop = $(this).scrollTop();
    let conteudo = $(document).height() - $(window).height();

    if (scrollTop >= conteudo) {
        pageNumber++;
        setTimeout(() => {
            loadByScrollbar(pageNumber);
        }, 200)
    }
});

function loadByScrollbar(pageNumber) {
    $.ajax({
        method: "GET",
        url: "/promocao/list/ajax",
        data: {
            page: pageNumber
        },
        success: function (response) {
            $(".row").fadeIn(250, function () {
                $(this).append(response);
            });
        }
    });
}