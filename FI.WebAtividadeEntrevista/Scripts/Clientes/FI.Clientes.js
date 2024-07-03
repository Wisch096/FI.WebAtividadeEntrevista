$(document).ready(function () {
    let beneficiarios = [];
    let clienteId = null;

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": $(this).find("#CPF").val().replace(/\D/g, ''),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    console.log(r.clienteId)
                    ModalDialog("Sucesso!", r.mensagem)
                    clienteId = r.clienteId;
                    $("#formCadastro")[0].reset();
                    $.ajax({
                        url: urlPostBeneficiario,
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                            clienteId: clienteId,
                            beneficiarios: beneficiarios
                        }),
                        error: function (r) {
                            if (r.status == 400)
                                ModalDialog("Ocorreu um erro", r.responseJSON);
                            else if (r.status == 500)
                                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        },
                        success: function (r) {
                            $('.table tbody').empty();
                            beneficiarios = [];
                        }
                    });
                }
        });
    });

    $('#formCadastroBenef').submit(function (e) {
        e.preventDefault();

        var cpf = $('#CPFBeneficiario').val().replace(/\D/g, '');
        var nome = $('#NomeBeneficiario').val();

        beneficiarios.push({
            CPF: cpf,
            Nome: nome
        });

        var newRow = '<tr>' +
            '<td>' + cpf + '</td>' +
            '<td>' + nome + '</td>' +
            '<td>' +
            '<button class="btn btn-primary">Alterar</button> ' +
            '<button class="btn btn-danger">Excluir</button>' +
            '</td>' +
            '</tr>';

        $('.table tbody').append(newRow);
        $("#formCadastroBenef")[0].reset();

    });

    $('#CPF').on('input', function () {
        var cpf = $(this).val();

        cpf = cpf.replace(/\D/g, '');

        if (cpf.length <= 11) {
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        $(this).val(cpf);
    });

})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
