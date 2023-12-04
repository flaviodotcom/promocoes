// capturar Meta Tags
$("#linkPromocao").on("change", function () {
    var url = $("#linkPromocao").val();

    if (url.length > 7) {
        $.ajax({
            method: "POST",
            url: `/meta/info?url=${url}`,
            cache: false,
            success: function (data) {
                console.log(data);
            }
        });
    }
});
