using System;
using estate_cost.application.Common.Dto.Request;
using estate_cost.application.Common.Dto.Response;
using Ganss.Excel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace estate_cost.web.api.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/sessions")]
    public class SessionsController : ControllerBase
    {
        /// <summary>
        /// Создать новую сессию.
        /// </summary>
        [HttpPost("create")]
        public IActionResult CreateSession()
        {
            return Ok();
        }

        /// <summary>
        /// Получить текущее состояние сессии.
        /// </summary>
        [HttpGet("state")]
        public ActionResult<SessionsResponse.Session> GetSessionState()
        {
            return new SessionsResponse.Session(124,
                                                "Test12",
                                                DateTime.UtcNow,
                                                DateTime.UtcNow,
                                                new(),
                                                new List<SessionsResponse.SingleEstate>() { new (0,"Ул.Одесская",3,1,100,new(55.751952, 37.600739), 999999),
                                                new (0,"Ул.Комсомольская",3,1,100,new(37.600739, 55.751952), 999999)},
                                                new(new(
                                                         3246,
                                                         "fdsa",
                                                         2,
                                                         5,
                                                         46645,
                                                         new(4646, 86785),
                                                         5374475457457),
                                                     new List<SessionsResponse.SingleEstate>()));
        }

        /// <summary>
        /// Переключить сессию на заданную <paramref name="sessionId"/>
        /// </summary>
        /// <remarks>Если <paramref name="sessionId"/> не задано, используется последняя по дате.</remarks>
        [HttpOptions("switch")]
        public IActionResult SwitchSession([FromQuery] long? sessionId)
        {
            return Ok();
        }

        /// <summary>
        /// Возвращает 20 объектов истории сессиий начинающихся после элемента <paramref name="lastId"/>
        /// </summary>
        /// <remarks>Eсли не указано <paramref name="lastId"/> возвращает последние 20 сессий.</remarks>
        [HttpGet("history")]
        public ActionResult<IList<SessionsResponse.SessionHistoryItem>> GetSessionsHistory([FromQuery] long? lastId)
        {
            return new List<SessionsResponse.SessionHistoryItem>()
            {
                new(1324535, "asdasd", 34, DateTime.UtcNow, DateTime.UtcNow),
                new(346, "dfgdfhhfgd", 45, DateTime.UtcNow.AddDays(-1), DateTime.UtcNow.AddHours(-6)),
                new(78, "kljjkl;;l", 45, DateTime.UtcNow.AddDays(-5), DateTime.UtcNow.AddDays(-3)),
            };
        }

        /// <summary>
        /// Загрузка файла с пулом недвижимости.
        /// </summary>
        [HttpPost("fileupload")]
        public async Task<ActionResult<IEnumerable<SessionsRequest.EstateExcelFileModel>>> UploadFile(IFormFile file, CancellationToken cancellationToken)
        {
            using var stream = file.OpenReadStream();

            var mapper = new ExcelMapper();
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(1, prop => prop.Location);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(2, prop => prop.Rooms)
                .SetPropertyUsing((obj, type) =>
                {
                    if (type.CellType == NPOI.SS.UserModel.CellType.Numeric)
                        return (int)type.NumericCellValue;

                    return 0;
                });

            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(3, prop => prop.Segment);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(4, prop => prop.HouseFloors);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(5, prop => prop.WallMaterial);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(6, prop => prop.ApartamentFloor);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(7, prop => prop.ApartmentArea);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(8, prop => prop.KitchenArea);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(9, prop => prop.Balcony)
                .SetPropertyUsing((obj, type) => type.StringCellValue.ToLowerInvariant().Replace(" ", "") == "да");

            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(6, prop => prop.MetroRangeMin);
            mapper.AddMapping<SessionsRequest.EstateExcelFileModel>(6, prop => prop.DecorationState);

            var result = mapper.Fetch<SessionsRequest.EstateExcelFileModel>();

            return Ok(result);
        }
    }
}
