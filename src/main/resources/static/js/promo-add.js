// submit formulario para controller
$("#form-add-promo").submit((event) => {
    event.preventDefault();

    let promo = {};
    promo.linkPromocao = $("#linkPromocao").val();
    promo.descricao = $("#descricao").val();
    promo.preco = $("#preco").val();
    promo.titulo = $("#titulo").val();
    promo.categoria = $("#categoria").val();
    promo.linkImagem = $("#linkImagem").attr("src");
    promo.site = $("#site").text();

    console.log("promo > ", promo);

    $.ajax({
        method: "POST",
        url: "/promocao/save",
        data: promo,
        beforeSend: () => {
            $("#form-add-promo").hide();
            $("#loader-form").addClass("loader loader-center").show();
        },
        success: () => {
            $("#form-add-promo").each(function () {
                this.reset();
            });
            $("#linkImagem").attr("src", "/images/promo-dark.png");
            $("#site").text("");
            $("#alert").addClass("alert alert-success").text("Promoção cadastrada com sucesso.");
        },
        statusCode: {
            422: function (xhr) {
                console.log('status error:', xhr.status);
                var errors = $.parseJSON(xhr.responseText);
                $.each(errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#error-" + key)
                        .addClass("invalid-feedback")
                        .append("<span class='error-span'>" + val + "</span>")
                });
            }
        },
        error: (xhr) => {
            console.log("> error: ", xhr.responseText);
            $("#alert").addClass("alert alert-danger").text("Não foi possível salvar esta promoção");
        },
        complete: () => {
            $("#loader-form").fadeOut(800, function () {
                $("#form-add-promo").fadeIn(250);
                $("#loader-form").removeClass("loader-center").removeClass("loader");
            });
        }
    });
});


// capturar Meta Tags
$("#linkPromocao").on("change", () => {
    const url = $("#linkPromocao").val();

    if (url.length > 7) {
        $.ajax({
            method: "POST",
            url: `/meta/info?url=${url}`,
            cache: false,
            beforeSend: () => {
                $("#alert").removeClass("alert alert-danger alert-success").text("");
                $("#titulo").val("");
                $("#site").text("");
                $("#linkImagem").attr("src", "");
                $("#loader-img").addClass("loader");
            },
            success: (data) => {
                console.log(data);
                $("#titulo").val(data.title);
                $("#site").text(data.site.replace("@", ""));
                $("#linkImagem").attr("src", data.image);
            },
            statusCode: {
                404: () => {
                    $("#alert").addClass("alert alert-danger").text("Não foi possível recuperar nenhuma informação dessa URL.");
                    $("#linkImagem").attr("src", "/images/promo-dark.png");

                }
            },
            error: () => {
                $("#alert").addClass("alert alert-danger").text("Ops... Algo deu errado, tente novamente mais tarde.");
                $("#linkImagem").attr("src", "/images/promo-dark.png");
            },
            complete: () => {
                $("#loader-img").removeClass("loader");
            }
        });
    }
});
