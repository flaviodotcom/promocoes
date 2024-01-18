let pageNumber = 0;

$(document).ready(function () {
    $("#loader-img").hide();
    $("#fim-btn").hide();
});

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
        beforeSend: () => {
            $("#loader-img").show();
        },
        success: function (response) {
            if (response.length > 150) {
                $(".row").fadeIn(250, function () {
                    $(this).append(response);
                });
            } else {
                $("#fim-btn").show();
                $("#loader-img").removeClass("loader");
            }
        },
        error: function (xhr) {
            alert(`Ocorreu um erro: ${xhr.status} - ${xhr.statusText}`)
        },
        complete: () => {
            $("#loader-img").hide();
        }
    });
}