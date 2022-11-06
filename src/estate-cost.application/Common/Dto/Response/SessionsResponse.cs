using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace estate_cost.application.Common.Dto.Response
{
    public static class SessionsResponse
    {
        public record SessionHistoryItem(long Id,
                                         string Name,
                                         int EstateQuntity,
                                         DateTime Created,
                                         DateTime LastUpdated);

        public record SessionHistoryState(long Id, DateTime Created);

        public record Session(long Id,
                              string Name,
                              DateTime Created,
                              DateTime LastUpdated,
                              Correction Correction,
                              IList<SingleEstate> EstatePool,
                              ReferenceEstate ReferenceEstate);

        public record ReferenceEstate(SingleEstate Estate, IList<SingleEstate> EstateAnalogs);

        public record SingleEstate(long Id,
                                   string Location,
                                   int Rooms,
                                   int ApartamentFloor,
                                   double ApartmentArea,
                                   GeoCode Coordinates,
                                   long PriceRUB);

        public record struct GeoCode(double Longitude, double Latitude);

        public record struct Correction(float Haggle,
                                        float Area,
                                        float MetroDistance,
                                        float Floor,
                                        float Rooms,
                                        float KitchenArea,
                                        float Balcon,
                                        float RepairState);
    }
}
