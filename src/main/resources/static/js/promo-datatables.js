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

function dateFormat(dtCadastro) {
    moment.locale('pt-br');
    return moment(dtCadastro).format('LLL');
}

$(document).ready(function () {

    const table = $("#table-server").DataTable({
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
            {data: 'dtCadastro', render: dateFormat},
            {data: 'categoria.titulo'}
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Editar',
                attr: {
                    id: 'btn-editar',
                    type: 'button'
                },
                enabled: false
            },
            {
                text: 'Excluir',
                attr: {
                    id: 'btn-excluir',
                    type: 'button'
                },
                enabled: false
            }
        ]
    });

    $("#table-server thead").on('click', 'tr', function () {
        table.buttons().disable();
    });

    $("#table-server tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            table.buttons().disable();
        } else {
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            table.buttons().enable();
        }
    });

    $("#btn-editar").on('click', function () {
        if (isSelectedRow()) {
            $("#modal-form").modal('show');
        }
    });

    $("#btn-excluir").on('click', function () {
        if (isSelectedRow()) {
            $("#modal-delete").modal('show');
        }
    });

    $("#btn-del-modal").on('click', function () {
        var id = getPromoId();
        $.ajax({
            method: "GET",
            url: `/promocao/delete/${id}`,
            success: function () {
                $("#modal-delete").modal('hide');
                table.ajax.reload();
            },
            error: function () {
                alert("Ops... Ocorreu um erro, por favor, tente mais tarde")
            }
        });
    });

    $(".modal").css("z-index", "1500");

    function getPromoId() {
        return table.row(table.$('tr.selected')).data().id;
    }

    function isSelectedRow() {
        let trow = table.row(table.$('tr.selected'));
        return trow.data() !== undefined;
    }
});
