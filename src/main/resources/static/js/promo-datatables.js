const Regex_Url_Str = "(https?:\\/\\/)?" // protocol
    + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" // domain name
    + "((\\d{1,3}\\.){3}\\d{1,3}))" // OR ip (v4) address
    + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" // port and path
    + "(\\?[;&a-z\\d%_.~+=-]*)?" // query string
    + "(\\#[-a-z\\d_]*)?";

const StringUtil = {
    isValidUrl: (str) => new RegExp(Regex_Url_Str, "i").test(str),
    parseHyperlinks: (str) => str.replaceAll(new RegExp(Regex_Url_Str, "gim"), "<a target=\"_blank\" rel=\"noreferrer\" href=\"$&\">$&</a>"),
};

function openLink(data, type) {
    if (type === 'display' && StringUtil.isValidUrl(data)) {
        return StringUtil.parseHyperlinks(data);
    }
    return data;
}

$(document).ready(function () {

    $("#table-server").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        lengthMenu: [10, 15, 20, 25],
        ajax: {
            url: "/promocao/datatables/server",
            data: "data"
        },
        columns: [
            {data: 'id'},
            {data: 'titulo'},
            {data: 'site'},
            {data: 'linkPromocao', render: openLink},
            {data: 'descricao'},
            {data: 'linkImagem', render: openLink},
            {data: 'preco', render: $.fn.dataTable.render.number('.', ',', 2, 'R$')},
            {data: 'likes'},
            {data: 'dtCadastro'},
            {data: 'categoria.titulo'}
        ]
    });
});