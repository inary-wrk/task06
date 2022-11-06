using System.Runtime.CompilerServices;
using Yarp.ReverseProxy.Configuration;

namespace estate_cost.web.bff.Configuration
{
    public static class YARPConfig
    {
        public static IReverseProxyBuilder AddYarpConfig(this IReverseProxyBuilder builder, AppSettings appSettings)
        {
            builder.LoadFromMemory(new[]
                                  {
                                      new RouteConfig()
                                      {
                                          RouteId = "api",
                                          ClusterId = "cluster1",

                                          Match = new()
                                          {
                                              Path = "/api/{**catch-all}"
                                          }
                                      }
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
                                                      Address = $"{appSettings.API_URL}/api"
                                                  }
                                              },
                                          }
                                      }
                                  });

            return builder;
        }
    }
}
