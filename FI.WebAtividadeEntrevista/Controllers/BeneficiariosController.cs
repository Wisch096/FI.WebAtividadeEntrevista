    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using FI.AtividadeEntrevista.BLL;
    using FI.AtividadeEntrevista.DML;
    using WebAtividadeEntrevista.Models;

    namespace FI.WebAtividadeEntrevista.Controllers
    {
        public class BeneficiariosController : Controller
        {
            [HttpPost]
            public JsonResult Incluir(BeneficiariosModel model)
            {
                BoBeneficiario bo = new BoBeneficiario();
                
                if (!this.ModelState.IsValid)
                {
                    List<string> erros = (from item in ModelState.Values
                                          from error in item.Errors
                                          select error.ErrorMessage).ToList();

                    Response.StatusCode = 400;
                    return Json(string.Join(Environment.NewLine, erros));
                }
                else
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {                    
                        Nome = model.Nome,
                        CPF = model.CPF
                       
                    });
                    
                    return Json("Cadastro efetuado com sucesso");
                }
            }
            
        }
    }