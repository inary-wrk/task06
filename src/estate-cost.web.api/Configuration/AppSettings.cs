namespace estate_cost.web.api.Configuration
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public class AppSettings
    {
        public string AUTHORITY_URL { get; set; }
        public ConnectionStrings CONNECTION_STRINGS { get; set; }
    }

    public class ConnectionStrings
    {
        public string DEFAULTCONNECTION { get; set; }
    }
}
