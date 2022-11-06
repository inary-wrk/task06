using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ganss.Excel;

namespace estate_cost.application.Common.Dto.Request
{
    public static class SessionsRequest
    {
        public record EstateExcelFileModel(string Location,
                                           int Rooms,
                                           string Segment,
                                           int HouseFloors,
                                           string WallMaterial,
                                           int ApartamentFloor,
                                           double ApartmentArea,
                                           double KitchenArea,
                                           bool Balcony,
                                           int MetroRangeMin,
                                           string DecorationState);
    }
}
