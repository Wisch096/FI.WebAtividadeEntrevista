
$(document).ready(function () {
    let beneficiarios = [];
    let clienteId = null;
    
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #CPF').val(obj.CEP);
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
                '<button class="btn btn-primary">Alterar</button> ' +
                '<button class="btn btn-danger">Excluir</button>' +
                '</td>' +
                '</tr>';

            $('.table tbody').append(newRow);
        });
    }
    
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
        console.log(beneficiarios)
        $('.table tbody').append(newRow);
    });
    
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": $(this).find("#CPF").val(),
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
                console.log("response", r)
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
                clienteId = r.clienteId;
                console.log("dentro de success", beneficiarios, clienteId)
                $.ajax({
                    url: urlPostBeneficiario,
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        clienteId: clienteId,
                        beneficiarios: beneficiarios
                    }),
                    error: function (r) {
                        console.log("Erro no cadastro dos beneficiários", r);
                        console.log("Estado da requisição:", r.readyState);
                        console.log("Status:", r.status);
                        console.log("Resposta:", r.responseText);
                        console.log("Cabeçalhos:", r.getAllResponseHeaders());
                        if (r.status == 400) {
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        } else if (r.status == 500) {
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        }
                    },
                    success: function (r) {
                        console.log("Beneficiários cadastrados com sucesso", r);
                        $('.table tbody').empty();
                        beneficiarios = [];
                    }
                });
            }
        });
    })
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
