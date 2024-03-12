let pageNumber = 0;
let totalOfertas = Number(0);
const autocompleteInput = $("#autocomplete-input");

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
    let site = autocompleteInput.val();
    $.ajax({
        method: "GET",
        url: "/promocao/list/ajax",
        data: {
            page: pageNumber,
            site: site
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

autocompleteInput.autocomplete({
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

function init() {
    const eventSource = new EventSource("/promocao/notificacao");
    eventSource.onopen = (event) => {
        console.log("The connection has been established.");
    };

    eventSource.onmessage = (event) => {
        const count = event.data;
        if (count > 0) showButton(count);
    };
}

function showButton(count) {
    totalOfertas = totalOfertas + Number(count);
    $("#btn-alert").show(function () {
        $(this)
            .attr("style", "display: block;")
            .text(`Veja ${totalOfertas} nova(s) oferta(s)!`)
    });
}

$("#btn-alert").click(function () {
    $.ajax({
        method: "GET",
        url: "/promocao/list/ajax",
        data: {
            page: 0,
            site: ''
        },
        beforeSend: function () {
            pageNumber = 0;
            totalOfertas = 0;
            $("#fim-btn").hide();
            $("#loader-img").addClass("loader");
            $("#btn-alert").attr("style", "display: none;");
            $(".row").fadeOut(400, function () {
                $(this).empty();
            });
        },
        success: function (response, status) {
            console.log("Status: " + status);
            $("#loader-img").hide();
            $(".row").fadeIn(250, function () {
                $(this).append(response);
            });
        },
        error: function (error) {
            console.log("error", error);
        }
    });
});

window.onload = init();
