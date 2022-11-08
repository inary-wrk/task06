using System.Runtime.CompilerServices;
using Duende.Bff.Yarp;
using estate_cost.web.bff.Configuration;
using Yarp.ReverseProxy.Configuration;

namespace estate_cost.web.bff
{
    public static class YarpReverseProxy
    {
        public static void AddYarpReverseProxy(this WebApplicationBuilder builder)
        {
            var yarpBuilder = builder.Services
                .AddReverseProxy()
                .AddBffExtensions();


            yarpBuilder.LoadFromMemory(new[]
                                  {
                                      new RouteConfig()
                                      {
                                          RouteId = "api",
                                          ClusterId = "cluster1",

                                          Match = new()
                                          {
                                              Path = "/api/{**catch-all}"
                                          }
                                      }.WithAccessToken(Duende.Bff.TokenType.UserOrClient)
                                  },
                                  new[]
                                  {
                                      new ClusterConfig
                                      {
                                          ClusterId = "cluster1",

                                          Destinations = new Dictionary<string, DestinationConfig>(StringComparer.OrdinalIgnoreCase)
                                          {
                                              {
                                                  "destination1", new()
                                                  {
                                                      Address = builder.Configuration.Get<AppSettings>().API_URL
                                                  }
                                              },
                                          }
                                      }
                                  });
        }
    }
}
