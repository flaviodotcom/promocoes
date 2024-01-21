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

$("#autocomplete-input").autocomplete({
    source: function (request, response) {
        $.ajax({
            method: "GET",
            url: "/promocao/site",
            data: {
                termo: request.term
            },
            success: function (result) {
                response(result);
            }
        });
    }
});

$("#autocomplete-submit").on("click", function () {
    let site = $("#autocomplete-input").val();
    $.ajax({
        method: "GET",
        url: "/promocao/site/list",
        data: {
            site: site
        },
        beforeSend: function () {
            pageNumber = 0;
            $("#fim-btn").hide();
            $(".row").fadeOut(400, function () {
                $(this).empty();
            });
        },
        success: function (response) {
            $(".row").fadeIn(250, function () {
                $(this).append(response);
            });
        },
        error: function (xhr) {
            alert(`Algo deu errado: ${xhr.status} - ${xhr.statusText}`)
        }
    });
});

$(document).on("click", "button[id*='likes-btn-']", function () {
    let id = $(this).attr("id").split("-")[2];
    console.log("id: ", id);

    $.ajax({
        method: "POST",
        url: "/promocao/like/" + id,
        success: function (response) {
            $("#likes-count-" + id).text(response);
        },
        error: function (xhr) {
            alert(`Ocorreu um erro: ${xhr.status} - ${xhr.statusText}`)
        }
    });
});