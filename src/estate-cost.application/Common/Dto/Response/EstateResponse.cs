using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static estate_cost.application.Common.Dto.Response.SessionsResponse;

namespace estate_cost.application.Common.Dto.Response
{
    public static class EstateResponse
    {
        public record SingleEstate(long Id,
                           string Location,
                           int Rooms,
                           string Segment,
                           int HouseFloors,
                           string WallMaterial,
                           int ApartamentFloor,
                           double ApartmentArea,
                           double KitchenArea,
                           bool Balcony,
                           int MetroRangeMin,
                           string DecorationState,
                           GeoCode Coordinates,
                           long PriceRUB);
    }
}
