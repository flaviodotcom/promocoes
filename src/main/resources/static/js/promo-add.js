// capturar Meta Tags
$("#linkPromocao").on("change", () => {
    const url = $("#linkPromocao").val();

    if (url.length > 7) {
        $.ajax({
            method: "POST",
            url: `/meta/info?url=${url}`,
            cache: false,
            beforeSend: () => {
                $("#alert").removeClass("alert alert-danger").text("");
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