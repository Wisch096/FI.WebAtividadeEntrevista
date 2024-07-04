using System.ComponentModel.DataAnnotations;
using System.Linq;
using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;

namespace FI.WebAtividadeEntrevista.Validations
{
    public class CPFValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var bo = new BoCliente();
            var clienteModel = (ClienteModel)validationContext.ObjectInstance;
            var cpf = value as string;

            if (string.IsNullOrEmpty(cpf))
                return new ValidationResult("CPF é obrigatório.");

            cpf = cpf.Replace(".", "").Replace("-", "");

            if (cpf.Length != 11 || !cpf.All(char.IsDigit))
                return new ValidationResult("CPF deve ter 11 dígitos.");

            if (!CpfValido(cpf))
                return new ValidationResult("CPF inválido.");

            if (bo.VerificarExistencia(cpf))
            {
                var clienteExistente = bo.ObterClientePorCpf(cpf);
                if (clienteExistente != null && clienteExistente.Id != clienteModel.Id)
                    return new ValidationResult("CPF já existe na base de dados.");
            }

            return ValidationResult.Success;
        }

        private bool CpfValido(string cpf)
        {
            var cpfArray = cpf.Select(c => int.Parse(c.ToString())).ToArray();
            var somaPrimeiroDigito = 0;
            var somaSegundoDigito = 0;

            for (int i = 0; i < 9; i++)
            {
                somaPrimeiroDigito += cpfArray[i] * (10 - i);
                somaSegundoDigito += cpfArray[i] * (11 - i);
            }

            somaPrimeiroDigito = (somaPrimeiroDigito * 10) % 11;
            if (somaPrimeiroDigito == 10) somaPrimeiroDigito = 0;

            somaSegundoDigito += somaPrimeiroDigito * 2;
            somaSegundoDigito = (somaSegundoDigito * 10) % 11;
            if (somaSegundoDigito == 10) somaSegundoDigito = 0;

            return cpfArray[9] == somaPrimeiroDigito && cpfArray[10] == somaSegundoDigito;
        }

    }
}