$(document).ready(function () {
    let beneficiarios = [];
    let clienteId = null;
    let editandoBeneficiarioId = null;

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);

        obj.Beneficiarios.forEach(function (beneficiario) {
            var newRow = '<tr>' +
                '<td>' + beneficiario.CPF + '</td>' +
                '<td>' + beneficiario.Nome + '</td>' +
                '<td>' +
                '<button class="btn btn-primary" data-id="' + beneficiario.Id + '">Alterar</button> ' +
                '<button class="btn btn-danger" data-id="' + beneficiario.Id + '">Excluir</button>' +
                '</td>' +
                '</tr>';

            $('.table tbody').append(newRow);
        });
    }

    $(document).on('click', '.btn-primary', function () {
        var beneficiarioId = $(this).data('id');
        var row = $(this).closest('tr');
        var cpf = row.find('td').eq(0).text();
        var nome = row.find('td').eq(1).text();

        $('#CPFBeneficiario').val(cpf);
        $('#NomeBeneficiario').val(nome);
        $(this).closest('tr').remove();
        editandoBeneficiarioId = beneficiarioId;
    });

    $('#formCadastroBenef').submit(function (e) {
        e.preventDefault();

        var cpf = $('#CPFBeneficiario').val().replace(/\D/g, '');
        var nome = $('#NomeBeneficiario').val();

        beneficiarios.push({
            CPF: cpf,
            Nome: nome
        });
        
        if (editandoBeneficiarioId != null) {
            $.ajax({
                url: urlPostAlterarBeneficiario,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: editandoBeneficiarioId,
                    CPF: cpf,
                    Nome: nome
                }),
                success: function (response) {
                    var newRow = '<tr data-id="' + new Date().getTime() + '">' +
                        '<td>' + cpf + '</td>' +
                        '<td>' + nome + '</td>' +
                        '<td>' +
                        '<button class="btn btn-primary btn-alterar" data-id="' + new Date().getTime() + '">Alterar</button> ' +
                        '<button class="btn btn-danger" data-id="' + new Date().getTime() + '">Excluir</button>' +
                        '</td>' +
                        '</tr>';
                    $('.table tbody').append(newRow);

                    editandoBeneficiarioId = null;
                    
                    $('#CPFBeneficiario').val('');
                    $('#NomeBeneficiario').val('');
                },
                error: function (xhr, status, error) {
                    alert("Ocorreu um erro ao tentar atualizar o beneficiário: " + error);
                }
            });
        } else {
            var newRow = '<tr data-id="' + new Date().getTime() + '">' +
                '<td>' + cpf + '</td>' +
                '<td>' + nome + '</td>' +
                '<td>' +
                '<button class="btn btn-primary btn-alterar" data-id="' + new Date().getTime() + '">Alterar</button> ' +
                '<button class="btn btn-danger" data-id="' + new Date().getTime() + '">Excluir</button>' +
                '</td>' +
                '</tr>';

            $('.table tbody').append(newRow);
        }
        $('#CPFBeneficiario').val('');
        $('#NomeBeneficiario').val('');
    });

    $(document).on('click', '.btn-danger', function (e) {
        e.preventDefault();
        var beneficiarioId = $(this).data('id');
        console.log(urlDeleteBeneficiario)
        console.log(urlPost)
        $.ajax({
            url: urlDeleteBeneficiario,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({id: beneficiarioId}),
            success: function (response) {
                ModalDialog("Sucesso", "Beneficiário excluído")
                $(this).closest('tr').remove();
            }.bind(this),
            error: function (xhr, status, error) {
                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            }
        });
    });

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
                    ModalDialog("Sucesso!", "Cadastro do cliente atualizado com sucesso!")
                    $("#formCadastro")[0].reset();
                    clienteId = r.clienteId;
                    $.ajax({
                        url: urlPostBeneficiario,
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                            clienteId: clienteId,
                            beneficiarios: beneficiarios
                        }),
                        error: function (r) {
                            if (r.status == 400) {
                                ModalDialog("Ocorreu um erro", r.responseJSON);
                            } else if (r.status == 500) {
                                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                            }
                        },
                        success: function (r) {
                            $('.table tbody').empty();
                            beneficiarios = [];
                        }
                    });
                }
        });
    });

    $('#CPF').on('input', function () {
        var cpf = $(this).val();
        $(this).val(formatarCPF(cpf));
    });

    $('#CPFBeneficiario').on('input', function () {
        var cpf = $(this).val();
        $(this).val(formatarCPF(cpf));
    });

});

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 11) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
}



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
