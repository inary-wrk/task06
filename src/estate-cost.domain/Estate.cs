using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace estate_cost.domain
{
    public class Estate
    {
        public long Id { get; set; }
        public string Location { get; set; }
        public int Rooms { get; set; }
        public string Segment { get; set; }
        public int HouseFloors { get; set; }
        public string WallMaterial { get; set; }
        public int ApartamentFloor { get; set; }
        public double ApartmentArea { get; set; }
        public double KitchenArea { get; set; }
        public bool Balcony { get; set; }
        public int MetroRangeMin { get; set; }
        public string DecorationState { get; set; }
        public GeoCode Coordinates { get; set; }
        public long PriceRUB { get; set; }
    }
}
