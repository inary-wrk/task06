using Duende.Bff.Yarp;
using estate_cost.web.bff.Configuration;
using Microsoft.AspNetCore.Builder;
using Serilog;

namespace estate_cost.web.bff
{
    internal static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<AppSettings>(builder.Configuration);

            var appSettings = builder.Configuration.Get<AppSettings>();

            builder.Services.AddRazorPages();

            builder.Services.AddControllers();

            // add BFF services and server-side session management
            builder.Services.AddBff()
                .AddRemoteApis();

            var yarpBuilder = builder.Services
                .AddReverseProxy()
                .AddBffExtensions();

            //builder.Services.AddUserAccessTokenHttpClient("api_client", configureClient: client =>
            //{
            //    client.BaseAddress = new Uri("https://localhost:5002/");
            //});

            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = "cookie";
                    options.DefaultChallengeScheme = "oidc";
                    options.DefaultSignOutScheme = "oidc";
                })
                .AddCookie("cookie", options =>
                {
                    options.ExpireTimeSpan = TimeSpan.FromHours(8);
                    options.Cookie.Name = "__Host-bff";
                    options.Cookie.SameSite = SameSiteMode.Strict;
                })
                .AddOpenIdConnect("oidc", options =>
                {
                    options.Authority = appSettings.AUTHORITY_URL;
                    options.ClientId = "estate-cost_bff";
                    options.ClientSecret = "secret";
                    options.ResponseType = "code";
                    options.ResponseMode = "query";

                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.SaveTokens = true;
                    options.MapInboundClaims = false;

                    options.Scope.Clear();
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("api");
                    options.Scope.Add("offline_access");

                    options.TokenValidationParameters.NameClaimType = "name";
                    options.TokenValidationParameters.RoleClaimType = "role";
                });

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            var appSettings = app.Configuration.Get<AppSettings>();

            app.UseSerilogRequestLogging();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseRouting();

            // add CSRF protection and status code handling for API endpoints
            app.UseBff();
            app.UseAuthorization();

            app.MapBffManagementEndpoints();

            app.MapReverseProxy()
                .AsBffApiEndpoint()
                .RequireAccessToken();

            return app;
        }
    }
}