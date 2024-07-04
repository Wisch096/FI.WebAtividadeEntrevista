CREATE PROCEDURE FI_SP_ObterClientePorCpf
    @CPF VARCHAR(14)
AS
BEGIN
SELECT Id, CEP, CPF, Cidade, Email, Estado, Logradouro, Nacionalidade, Nome, Sobrenome, Telefone
FROM Clientes
WHERE CPF = @CPF;
END

