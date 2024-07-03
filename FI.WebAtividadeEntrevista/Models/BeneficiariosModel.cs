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
        public string CPF { get; set; }

        /// <summary>
        /// Id do cliente
        /// </summary>
        [Required]
        public long IdCliente { get; set; }
        
    }
}