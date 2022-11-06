namespace estate_cost.identity_server.Configuration
{
    public class AppSettings
    {
        public string IdentityServerUrl { get; set; }
        public ConnectionStrings CONNECTION_STRINGS { get; set; }
    }

    public class ConnectionStrings
    {
        public string DEFAULTCONNECTION { get; set; }
    }
}
