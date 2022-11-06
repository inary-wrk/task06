using estate_cost.application.Common.Dto.Request;
using estate_cost.application.Common.Dto.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace estate_cost.web.api.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/estate")]
    public class EstateCostController : ControllerBase
    {
        /// <summary>
        /// Изменить пул недвижимости.
        /// </summary>
        /// <remarks>Если не задан "Id" будет добавлен новый объект.</remarks>
        [HttpPut("pool")]
        public IActionResult ChangeEstatePool([FromBody] IList<EstateRequest.ChangedEstate> estate)
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<EstateResponse.SingleEstate> GetEstate(long id)
        {
            return Ok(new EstateResponse.SingleEstate(
                35235,
                "asfasdf",
                5,
                "stydsdg",
                6,
                "sdfsdfhhh",
                6,
                4646,
                46,
                false,
                6,
                "sfdgthgjfg",
                new(3452, 57675),
                456457457745475));
        }

        /// <summary>
        /// Оценить цену недвижимости учитывая заданные параметры.
        /// </summary>
        [HttpPut("evaluate")]
        public IActionResult EvaluateEstateCost([FromBody] EstateRequest.EvaluateSettings changes)
        {
            return Ok();
        }
    }
}
