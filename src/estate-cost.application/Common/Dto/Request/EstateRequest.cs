using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace estate_cost.application.Common.Dto.Request
{
    public static class EstateRequest
    {
        public record EvaluateSettings(IList<long> DisabledEstateAnalogs, Correction Correction);

        public record struct Correction(float Haggle,
                                        float Area,
                                        float MetroDistance,
                                        float Floor,
                                        float Rooms,
                                        float KitchenArea,
                                        float Balcon,
                                        float RepairState);

        public record SingleEstate(string Location,
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

        public record ChangedEstate(long? Id, SingleEstate Estate, bool IsDeleted);
    }
}
