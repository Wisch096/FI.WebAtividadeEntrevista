CREATE PROCEDURE FI_SP_ConsCliente
    @ID BIGINT
AS
BEGIN
    IF ISNULL(@ID, 0) = 0
BEGIN
        -- Se o ID for nulo ou zero, retornar todos os clientes
SELECT C.NOME, C.SOBRENOME, C.NACIONALIDADE, C.CEP, C.ESTADO, C.CIDADE, C.LOGRADOURO, C.EMAIL, C.TELEFONE, C.CPF, C.ID,
       B.CPF AS CPF_Beneficiario, B.NOME AS Nome_Beneficiario-- Adicione os campos da tabela BENEFICIARIOS aqui
FROM CLIENTES C
         LEFT JOIN BENEFICIARIOS B ON C.ID = B.IdCliente
END
ELSE
BEGIN
        -- Se o ID for especificado, retornar apenas o cliente com esse ID
SELECT C.NOME, C.SOBRENOME, C.NACIONALIDADE, C.CEP, C.ESTADO, C.CIDADE, C.LOGRADOURO, C.EMAIL, C.TELEFONE, C.CPF, C.ID,
       B.CPF AS CPF_Beneficiario, B.NOME AS Nome_Beneficiario  -- Adicione os campos da tabela BENEFICIARIOS aqui
FROM CLIENTES C
         LEFT JOIN BENEFICIARIOS B ON C.ID = B.IdCliente
WHERE C.ID = @ID
END
END
