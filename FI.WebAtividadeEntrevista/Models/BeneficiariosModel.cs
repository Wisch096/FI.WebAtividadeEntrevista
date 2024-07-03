using System.ComponentModel.DataAnnotations;
using FI.WebAtividadeEntrevista.Validations;

namespace WebAtividadeEntrevista.Models
{
    public class BeneficiariosModel
    {
        public long Id { get; set; }
        
        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }
        
        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        [CPFValidation]
        public string CPF { get; set; }

        /// <summary>
        /// Id do cliente
        /// </summary>
        [Required]
        public string IDCliente { get; set; }
        
    }
}